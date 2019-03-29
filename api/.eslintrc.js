module.exports = {
  extends: 'bambi/node',
  rules: {
    'prettier/prettier': 'error',
    'no-unused-vars': 'error',
    'promise/always-return': 'none',
    'promise/catch-or-return': ['error', { terminationMethod: ['catch', 'finally'] }],
  },
};
