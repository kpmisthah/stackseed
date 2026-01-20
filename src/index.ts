#!/usr/bin/env node
import { Command } from 'commander';
import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

const program = new Command();

program
    .name('stackseed')
    .description('CLI-first backend boilerplate generator for production-ready Node.js applications')
    .version('1.0.0')
    .argument('[project-name]', 'Name of the project directory')
    .action(async (projectName) => {
        let targetDir = projectName;

        if (!targetDir) {
            const answers = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'projectName',
                    message: 'What is the name of your project?',
                    default: 'my-backend-app',
                },
            ]);
            targetDir = answers.projectName;
        }

        const currentDir = process.cwd();
        const projectPath = path.join(currentDir, targetDir);
        const templatePath = path.resolve(__dirname, '../template');

        console.log(chalk.blue(`\nCreating project in ${projectPath}...`));

        try {
            if (fs.existsSync(projectPath)) {
                console.error(chalk.red(`Error: Directory ${targetDir} already exists.`));
                process.exit(1);
            }

            console.log('Copying template files...');
            await fs.copy(templatePath, projectPath);

            const pkgJsonPath = path.join(projectPath, 'package.json');
            if (await fs.pathExists(pkgJsonPath)) {
                const pkg = await fs.readJson(pkgJsonPath);
                pkg.name = targetDir;
                pkg.version = '1.0.0';
                await fs.writeJson(pkgJsonPath, pkg, { spaces: 2 });
            }

            const envExamplePath = path.join(projectPath, '.env.example');
            const envPath = path.join(projectPath, '.env');
            if (await fs.pathExists(envExamplePath)) {
                await fs.copy(envExamplePath, envPath);
            }

            console.log(chalk.green('\n✓ Success! Your backend is ready.'));
            console.log(chalk.blue('\n📦 Next steps:\n'));
            console.log(chalk.cyan(`  cd ${targetDir}`));
            console.log(chalk.cyan(`  npm install`));
            console.log(chalk.cyan(`  npm run dev`));
            console.log(chalk.gray('\n💡 Your API will be running at http://localhost:5000'));
            console.log(chalk.green('\nHappy coding! 🚀\n'));

        } catch (error) {
            console.error(chalk.red('Error creating project:'), error);
        }
    });

program.parse(process.argv);
