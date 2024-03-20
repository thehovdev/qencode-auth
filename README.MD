Starting the Project: 
1. Clone the repository
2. Run the command `npm install` to install the dependencies
3. Run the command `npm run dev` to start the project
4. Open the browser and go to `http://localhost:3000/` to see the project


Project Documentation: 
1. The project is built using Next.js, a React framework
2. The project uses the following dependencies:
    - Tailwind CSS: For styling the components
    - Typescript : For strict type checking and better code quality
    - FetchApi: For fetching the data from the API
3. The project is divided into the following components:
    - Button: A reusable button component
    - Divider: A reusable divider component
    - Input: A reusable input component
    - PageLabel: A reusable label of beginning on each page component
    - SignupHint: A reusable signup hint at footer of Login page
    - SocialButtons: A reusable social buttons component for authentication
    - Pages Folder: Contains components which are used as pages in the project:
      - Login: The login page component
      - SetNew: The set new password page component
      - Forgot: The forgot password page component
    - Interfaces Folder: Contains the interfaces used in the project
    - Utils Folder: Contains the utility functions used in the project
    - Public Folder: Contains the public assets used in the project
    - App Folder: Contains pages of application with recommended standart of Next.js
4. Project Workflow
   - Login Page: 
     - The user can login using the email and password
     - The user can click the social buttons
     - The user can also navigate to the forgot password page
   - Forgot Password Page:
     - The user can enter the email to get the reset password link
     - The user can also navigate to the login page
    - Set New Password Page:
      - /set-new?token=token&secret=secret
      - The user can enter the new password and confirm the new password
      - The user can also navigate to the login page
      - The user must add secret and token query strin to url to check functionality
   - Refresh & Verify token was not imlemented, because we haven't some use cases at current stage of application
5. The project is responsive and works well on all screen sizes
6. Regarding Figma, layout was not placed in center of the page, so we add some padding from top, unique by each screen, to make it look better
7. The project was started at 20 March 2024 14:30 and Finished at 20 March 2024 19:30