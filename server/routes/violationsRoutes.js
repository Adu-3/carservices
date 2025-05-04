const express = require('express');
const router = express.Router();
const Violation = require('../modules/Violations');
const User = require('../modules/User');

// Async handler to clean up try/catch
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// GET /api/:username/violations — fetch unpaid and paid violations
router.get('/:username/violations', asyncHandler(async (req, res) => {
  const user = await User.findOne({ username: req.params.username })
    .populate({
      path: 'violations',
      model: 'Violation'
    })
    .populate({
      path: 'paidViolations',
      model: 'Violation'
    })
    .lean();

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  const responseData = [
    ...(user.violations || []).map(v => ({ ...v, paid: false })),
    ...(user.paidViolations || []).map(v => ({ ...v, paid: true }))
  ];

  res.status(200).json({
    success: true,
    data: responseData
  });
}));

// POST /api/pay-violations — pay for selected violations
router.post('/pay-violations', asyncHandler(async (req, res) => {
  const { username, violationIds } = req.body;

  // Validate input
  if (!username || !Array.isArray(violationIds) || violationIds.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Invalid request data'
    });
  }

  // Fetch user
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  // Fetch violations to pay
  const violations = await Violation.find({ _id: { $in: violationIds } });
  if (violations.length === 0) {
    return res.status(404).json({
      success: false,
      message: 'No violations found for payment'
    });
  }

  // Calculate total payment
  const totalAmount = violations.reduce((sum, v) => sum + v.amount, 0);

  // Check if user has enough balance
  if (user.balance < totalAmount) {
    return res.status(400).json({
      success: false,
      message: 'Insufficient funds'
    });
  }

  // Deduct balance from user account
  user.balance -= totalAmount;

  // Mark the violations as paid
  user.paidViolations = [...new Set([...user.paidViolations, ...violationIds])];
  user.violations = user.violations.filter(v => !violationIds.includes(v.toString()));

  // Save updated user
  await user.save();

  // Update violations to reflect the paid status
  await Violation.updateMany(
    { _id: { $in: violationIds } },
    { $set: { paid: true } }
  );

  // Respond with the new balance and list of paid violations
  res.status(200).json({
    success: true,
    newBalance: user.balance,
    paidViolations: user.paidViolations
  });
}));

module.exports = router;
