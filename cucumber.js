module.exports = {
    default: {
        requireModule: ['ts-node/register'],
        require: [
            'src/step_definitions/**/*.ts'
        ],
        format: ['progress', 'html:target/cucumber-report/cucumber-report.html'],
        paths: ['src/features/**/*.feature']
    }
};