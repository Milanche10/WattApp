## Team readMe
Hi there my beloved team member
In this file you can find everything about technicality of our team work and functioning as a whole

Here are some rules we are going to respect while doing this project

1. Commits and comments are all going to be in English
2. For every new functionality, you are going to create a new branch from dev named by the given formula
{functionalityName}/{memberName}/{issueNumber}
3. You can't commit code that doesn't work. Before commiting test your code
4. If merge error appears you should contact your team leader asap
5. Every team member must create ToDoList.md file in their folders and keep the file updated at all times
6. Before writing any changes first Pull or Fetch in source control then keep working on your code

And Have fun doing the project!

# Envio
This is a web application that uses Angular as the front-end framework and .NET as the back-end technology.
Running this project on localhost is easy as it gets
## Prerequisites
Before you begin, ensure you have met the following requirements:

You have installed the latest version of Node.js.
You have installed the Angular CLI.
You have installed the .NET Framework.
You have installed the python.

Versions
    Angular CLI: 15.2.0
    Node: 16.14.2
    Package Manager: npm 8.5.0
    OS: win32 x64
    Python: 3.11

## Download project
1. Open your web browser and navigate to the GitLab website.

2. Log in to your GitLab account.

3. Navigate to the [project](http://gitlab.pmf.kg.ac.rs/wattapp/envio) that you want to download or clone.

4. Click on the "Clone" button located on the right side of the screen.

5. Copy the HTTPS or SSH URL of the repository.

6. Open a command prompt or terminal window on your local machine.

7. Navigate to the directory where you want to download or clone the project.

8. Use the git clone command followed by the copied URL to download or clone the project.
For HTTPS URL:
`git clone https://gitlab.com/<username>/<project>.git`
For SSH URL:
`git clone git@gitlab.com:<username>/<project>.git`
9. Press enter and wait for the download or clone to complete.
Once the download or clone is complete, you should have the project files on your local machine and you can make changes to the code as needed.

## Install node.js
1. Go to the official Node.js website at https://nodejs.org.

2. Click on the "Download" button for the recommended version of Node.js, which is typically the LTS (Long-Term Support) version.

3. Once the download is complete, run the installer and follow the installation wizard.

4. During the installation, you can customize the installation settings, such as the installation directory and additional components to install.

5. After the installation is complete, open a command prompt or terminal window and run the following command to verify that Node.js is installed correctly: `node -v`

This command will print the version of Node.js that is currently installed on your machine.
Once Node.js is installed, you can use its package manager (npm) to install other packages and dependencies for your Node.js and front-end projects.
## Installing the Angular Front-End
1. Open a command prompt or terminal window on your local machine.

2. Navigate to the root directory of the downloaded project using the cd command.

3. Install the Angular CLI as a devDependency by running the following command: `npm install --save-dev @angular/cli`

4. Install any other dependencies required by the project by running the following command: `npm install`

5. Once the dependencies are installed, you can start the development server and run the project by running the following command: `ng serve`

This will start the development server and open the Angular application in the default web browser at http://localhost:4200.

Note: Make sure you have Node.js and npm installed on your machine before running these commands.

## Installing the .NET Back-End
To install the .NET back-end, follow these steps:

1. Go to the official .NET website at https://dotnet.microsoft.com/download/dotnet/7.0.

2. Select the appropriate version of .NET 7.0.203 for your operating system.

3. Once the download is complete, run the installer and follow the installation wizard.

4. During the installation, you can customize the installation settings, such as the installation directory and additional components to install.

5. After the installation is complete, open a command prompt or terminal window and run the following command to verify that .NET is installed correctly: 
`dotnet --version`

This command will print the version of .NET that is currently installed on your machine.

Once .NET is installed, you can use it to run, build, and deploy .NET applications, including the back-end of your web application. Note that depending on the project you have downloaded, there may be additional dependencies and requirements for building and running the project, which you will need to install separately.

## Installing python
1. Go to the official Python website at https://www.python.org/downloads/release/python-3810/.

2. Scroll down to the "Files" section and download the appropriate installer for your operating system.

3. Once the download is complete, run the installer and follow the installation wizard.

4. During the installation, you can customize the installation settings, such as the installation directory and additional components to install.

5. After the installation is complete, open a command prompt or terminal window and run the following command to verify that Python is installed correctly:
`python --version`

This command will print the version of Python that is currently installed on your machine.

Once Python is installed, you can use it to run Python scripts, develop Python applications, and install packages using pip, the Python package manager. Note that depending on your project, you may need to install additional Python packages and dependencies to run or develop the application.

## Build and run Frontend
To build and run a front-end Angular project, you can follow these steps:

1. Open a command prompt or terminal window on your local machine.

2. Navigate to the root directory of the Angular project using the cd command.

3. Run the following command to install any dependencies required by the project: `npm install`

4. After the dependencies are installed, run the following command to build the project: `ng build`
This command will compile the project into distributable files that can be served by a web server.

5. Finally, run the following command to start the development server and serve the compiled project files: `ng serve`

This command will start a local development server and open a browser window displaying the project.

Project uses API services provided by the back-end .NET application, you may need to configure the project to connect to the correct API endpoints. This can typically be done by updating the URLs or configuration files in the Angular project.
## Build and run Backend
To build and run a .NET back-end application, you can follow these steps:

1. Open a command prompt or terminal window on your local machine.

2. Navigate to the root directory of the .NET project using the `cd` command.

3. Run the following command to restore any dependencies required by the project: `dotnet restore`

4. After the dependencies are restored, run the following command to build the project: `dotnet build`
This command will compile the project into executable files that can be run on a server.

5. Finally, run the following command to start the application: `dotnet run`

This command will start the application and make it available at the configured endpoint.

Application uses a database, you need to run database migrations or seed data to ensure the database is up-to-date and populated with initial data. This can typically be done by running any relevant database commands provided by the application or its framework.
## Running the Application
To run the application, follow these steps:

In the `backend` directory, run ` dotnet ef database update` in CLI to make database locally or in PackageManagerConsole `EntityFrameworkCore\Update-Database`.
Navigate to `app\Backend\EnvioBack\databaseFiller.py` and run the python file to populate your database.
In the `backend` directory, run ` dotnet run` to start the .Net server.
In the `frontend` directory, run `ng serve` to start the Angular development server.
Open your browser and navigate to `http://localhost:4200` to use the application.



## If you dont want to install visual studio or visual studio code
If you already have an Angular and .NET project downloaded and you don't want to use Visual Studio or Visual Studio Code to run it, you can still use the command-line tools to run your application.

Here are the general steps you can follow:

1. Open a command prompt or terminal window.

2. Change the directory to the root folder of your Angular project.

3. Install the required packages by running the following command:
`npm install`

4. Build the Angular project by running the following command:
`ng build --prod`

5. Change the directory to the root folder of your .NET project.

6. Build the .NET project by running the following command:
`dotnet run`

8. Once the .NET project is running, open a web browser and navigate to the URL of your application. This is usually http://localhost:5000 or https://localhost:5001.

If your Angular project uses any API endpoints from the .NET project, make sure to update the URLs in your Angular code to point to the correct URL where the .NET project is running.

Note that if your application requires any additional setup, such as configuring a database or setting up environment variables, you may need to consult the documentation or seek further guidance.



## Update URLs 
To update the URLs in your Angular project to point to the correct URL where the .NET project is running, you can follow these steps:

1. Open your Angular project in your preferred code editor or IDE.

2. Find the file where the API endpoint URL is defined. This could be in a service file, a component file, or an environment file, depending on how your project is structured.

3. Update the API endpoint URL to the correct URL where the .NET project is running. For example, if your .NET project is running on `http://localhost:5000`, you would update the URL to `http://localhost:5000/api/endpoint`.

4. Save the changes to the file.

5. Repeat this process for any other files that define API endpoint URLs.

6. Rebuild the Angular project using the `ng build --prod` command to ensure that the updated URLs are included in the build.

Once you have updated the URLs, your Angular project should be able to successfully communicate with the .NET project at the correct URL.


## Contributing to the Project
Contributions are welcome! If you would like to contribute, please follow these steps:

1.Fork this repository.
2.Create a branch: `git checkout -b <branch_name>`.
3.Make your changes and commit them: `git commit -m '<commit_message>'`
4.Push to the original branch: `git push origin <project_name>/<location>`
5.Create the pull request.

Alternatively, see the GitHub documentation on [creating a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request).

## Testers
Application is running on port 10051 so to get to the application use this [link](http://softeng.pmf.kg.ac.rs:10051/).
You can log into this application using two accounts, one is prosummer and other one is dso or admin
To log into prosummer account use this credentials
  email: test@gmail.com password: test
  email: demo@gmail.com password: demo
You will be promped to change password first time you log into accounts, set it the way its easier for you

To log into dso account use this credentials
  email: admin@gmail.com password: admin