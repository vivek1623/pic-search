## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.


# Task

Create a minimal react application as per the description and using the above interface as reference :

## Must have (Requirements):

- A search bar that allows users to type into
- As they are typing, display results from https://www.flickr.com/services/api/flickr.photos.search.html
- As you scroll down to the bottom of the page, display more results if there are more results
- Save their search queries(in browser itself) so that the next time they come back, you can suggest search queries (like as a list/tags near the search bar)
- Clicking on a photo in the results will bring the photo up in a modal along with the caption if available.
- Use any UI framework e.g. bootstrap or material; ( a react specific version would be even better)



 Please ensure that you complete (almost) all the must have requirements before submitting your code.

### Bonus: 
- Make the search as efficient as possible with edge cases(0 results , More than x results )
- Showing proper loaders and placeholders
- Page should be responsive
- Feel free to any open source libraries
- The search bar section should be fixed and overlayed on top of the photo results as you scroll down on the page


### Resources:
- We recommend using https://github.com/facebook/create-react-app but not mandatory if you’re comfortable doing it any other way.
- You are free to use any open source library or framework with react-js. You will also be judged based on your choice of libraries and patterns.

### What We’re looking for:
- Code quality and style, good code should be self documenting with comments when necessary
- Architectural decisions, keep it simple but extensible, not too much over-engineering
- UX considerations, styles don't have be polished, but they should be reasonable and usable
- Reasonable type checking and error handling
- Performance, minimizing network requests.


### Output:  

- Please commit on Github/Bitbucket public repo and deploy the application on a public link using any provider like heroku.com or netlify.com or any other platform of your choice.
