To use this quick start, do the following steps.

1) Open solution in Visual Studio (as of this writing, VS 2019 was the latest version)

2) Set the ReactCore.Web project as the startup project.

3) Build project.
   a) This may take awhile the first time as Visual Studio will need to restore any NuGet and JavaScript dependencies.

4) Once built, you can start the project
   a) Run the C# project.  This will start the WebAPI server.
   b) Execute the "launchClient.bat" in the root of the solution.  This will start the JavaScript client server.
   c) Note that this is only necessary during development.  When a publish bundle is created and deployed to a server, 
      it will be a unified build.  All assets will be served from the same server.