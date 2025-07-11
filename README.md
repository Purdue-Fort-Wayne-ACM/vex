# Robotics


This is a NextJS project. To work with it, you will need to install NPM and NextJS. Once you have NPM, you can do this by running `npm install` in the same directory as this file. 

This was originally for writing some tutorials and example code for the vex robots, however, I have extended it to include drones. I would like to further extend it to address EV3 robots, and a virtual robot. This will support both the University and associated programs at the HS/MS level through providing quality educational content. 

To extend this, you just need to write a .mdx file in the folder you want, with the name you want (avoid colons and weird characters). This is setup as a 'pages' project, which means the URL on the server will be the URL of the file past the 'src/pages/' directory. Ie the file './src/pages/mdx-page.mdx' will appear on the website as 'https://websitename.com/mdx-page/'. The exceptions to this are '_app.tsx' and 'index.tsx', which are special files representing all pages (app) and the root of the website (index)

mdx-page.mdx demonstrates how to write the pages. They use basic markdown, extended with React components (MDX). This means you can use the same formatting you might use in discord, but you can add HTML tags or component tags at will. If you need a component written, either write it in the '/src/components/' directory or notify another team member and we can write it. 

This is a good way to get practice with writing components, modifying our site (we will use similar for the ACM site), writing documentation, and get some contributions to the community (and github). 

# Imports
You can copy the imports and exports from the project, or you can start from the mdx-template file I have created. I have made it a text file so my scripts ignore it, but when you create your files they should end in `.mdx`

# Testing the project
Run `npm run dev` to start a local server of the project, useful for seeing your changes and their effect. Run `npm run build` to build a static version of the site - you don't need to review this, just check if there's any errors. 


# File structure
 - public - stores public facing files, limit of 20Mb per file. Useful for hosting images or things to be downloaded by users. 
   - files - binary files
   - images - image files
 - src - Stores source code
   - components - Stores react code for components, which are bundled collections of html/js
   - pages - where website content goes. Most of these will be MDX pages. 
     - djitello - Content for the drone, DJI Tello
     - vexexp - Content for the Vex EXP
     - java - Content for the Java programming language
     - python - Content for the Python programming language
   - styles - css rules




# Github pages build

If using a custom domain or 404.html, place those in public/ — they’ll be copied to out/.

If deploying to a project site (not a user/org site), set the basePath and assetPrefix in next.config.js.


# Troubleshooting
<details markdown="1">
<summary>(Windows) "npm error Class extends value undefined is not a constructor or null"</summary>

This is mainly due to version incompatibilities between Node.js and `npm` (for example, if you're using the latest version of Node.js, but `npm` is globally installed under an older version, causing a version incompatibility).<br>

Here's how you can fix the issue to force `npm` to run the correct Node version:
- Run `nvm use [Node.js version you're using]`
- Then run `npm install -g npm`
</details>