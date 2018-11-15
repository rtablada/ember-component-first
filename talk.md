# Ember Understanding Components First

This talk/post is about learning Ember by exploring components first then expanding and exploring what other features and tools Ember has to offer.
This is different than traditional ways of learning Ember that usually start with routes, Ember Data, controllers, and more.

The goal of this talk is to present Ember components and show the similarities and differences between Ember and other tools.
This talk should feel familiar to new JavaScript developers and developers that are more familiar with tools like React, Preact, or Vue alike.

## The Setup (Demistifying Live Coding)

This talk is mostly a live-coding demo with just a few references and links.
Usually with live-coding, the presenter uses extra packages and addons to simplify the live-coding demo: there are no trick wires or fake walls here.

The Ember community and core-team have worked hard to bring a lot of modern and even future tools and practices into every-day Ember.
In this demo there are features that I've previously only shown behind feature-flags or in very WIP branches of Ember.
Almost everything you see/read here is in the latest stable branch of Ember and is ready to use by just running `ember new`.

However, there is one small exception to this rule: Decorators.
The community is working hard to make native ES6 classes and ES Next decorators the default experience in Ember.
But, due to some legacy support features and time, this isn't currently fully baked in Ember (as of October 2018).
To enable classes and decorators, I will be using an addon called `ember-decorators` which enables decorators and class syntax in Ember apps.
This addon is maintained by core-team members and is used as a directional tool on how decorators will be incorporated in Ember out of the box in the near future.

To recreate the exact Ember project that I am starting with run the following commands:

```
yarn global add ember-cli@latest
ember new game-list --no-welcome --yarn
cd game-list
ember install ember-decorators
```

> NOTE: You can also follow along on CodeSandbox with a project already setup with `ember-decorators` [here](https://codesandbox.io/s/github/rtablada/ember-new-output/tree/csb-1538965769735/)

## Starting the Development Server (Locally)

If you are following along on your own machine, you will need to start the server by running:

```
ember serve
```

This command starts the development server with live-reload, build-tooling, and much much more.
Now to visit the application in the browser go to http://localhost:4200

## Understanding HTML in Ember

In Ember, HTML is fundamental to describing the UI that the end user will be interacting with.
To describe this HTML, Ember uses templates in `.hbs` or Handlebars files.
Don't worry though everything you know about HTML syntax is still the same, there's no new syntax needed to get done what you already know how to do with plain HTML.
And, there's no changes to attribute names, events, or other common HTML features.

If you've had a bad experience with Handlebars or templating languages in the past, keep an open mind the flavor of Handlebars that Ember uses is pretty intutive and will feel pretty familiar and easy to use.

> NOTE: If you'd like to know more about why Ember uses a templating language instead of something like JSX check out my talk from Nodevember 2017 where I explain how Ember uses templates to optimize rendering, app code size, updates, and more [Video](https://www.youtube.com/watch?v=SteidHMcKiw)

Let's start adding some HTML to our application.

Now, Ember is a bit different than tools like React and Vue because instead of creating a first single component on the page, Ember starts an "Application" with routes, controllers, and more.
This usually scares some developers away since it seems like a lot of complexity up front.
We're actually going to skip around these features and focus on components in this talk.
For the most part for a basic application in Ember, we can completely skip routes just like any Vue or React app.

But, we do need to know one thing about Ember's application.
There is a special file `app/templates/application.hbs` this is the template for our entire app.
Similar to the default `App.vue` or `App.jsx` components in Vue-CLI or Create-React-App applications, this template is always rendered in our Ember app.
Any HTML or components here will show up for every page or "route" in our app.

So, we can start editing this file to see Ember's build tool and templating in action.

Let's replace the existing HTML with the following:

```html
<h1 class="title" style="color: red" onclick="alert('hello world')">Hello World</h1>
```

Notice, we're able to add inline styles, classes, and even regular DOM events to elements just like plain HTML.
There's no rules to learn about how to change HTML to a different syntax: all HTML is valid for Ember Handlebars!
Anything you can do with `innerHTML` or an HTML file is valid here.

## Adding Components

Tools like React popularized the ability to break reusable, smaller, and more maintainable pieces of UI into components.
Each component has the HTML, events, data, and behavior for a piece of UI that the user will see and interact with.
In Ember, a component can be as small and simple as only a template file.

Ember does do something a little bit different with components compared to other tools.
In Ember by default the components defined by your application are available in EVERY template in your application.
There are some new features coming to Ember that help to add namespacing, local components, aliasing, and more but this is something to be aware of.

Let's create a new `GameTile` component that will have a game image, game title, game description, and release year.
We'll start by actually calling this new `GameTile` component from our application template:

```hbs
<GameTile />
```

Notice this custom component looks just like a regular HTML element, we'll look at added features as we dig more into components.

When we save this change, the browser is blank.
This can be a bit confusing when first starting with JS apps, but often the cause is a failure to render or load the application.
By checking the console we can see there was an error and the Ember development build of our app gives us a handy message that says

> Uncaught Error: Compile Error: Cannot find component game-tile

This is because we don't actually have a `GameTile` or `game-tile` component in our application code.
Let's fix that!

Ember auto-loads components based on file name and a convention driven folder structure.
Since we want to create a new `game-tile` component starting with some HTML, we'll need to add a template in `app/templates/components/game-tile.hbs`.

```html
<div class="game-tile">
  <h1>Overwatch <span>2016</span></h1>
  <img
    alt
    role="presentation"
    src="https://images.igdb.com/igdb/image/upload/t_cover_big/fen88hu0vhcf3k3owkxd.jpg"
  >
  <p>A good first person shooter</p>
</div>
```

Now when we save, we can see the new game tile info showing up in our application.
Next, let's add another GameTile in our application template.
Our whole application template now looks like this:

```html
<h1 class="title" style="color: red" onclick="alert('hello world')">Hello World</h1>

<GameTile />
<GameTile />
```

## Component and HTML Attributes

Right now our `GameTile` component is repeating the same content twice.
Let's change this and allow each `GameTile` to be customized by adding attributes.
To start, let's try customizing the second game tile with a blue background.
To add this inline style we can directly add the `style` attribute to the `GameTile` element:

```html
<GameTile style="background: blue" />
```

While it's not super likely to apply styles to components directly like this, it does show that with Ember components, we can actually add ANY HTML attribute to a component and it will be added to the surrounding element for our component.
We don't need to do any extra work passing down class names, ids, etc.
But, what about data that we want to use in our component.

For our `GameTile`, let's make the `title` customizable with component attributes.
To add attributes for our component to use we need to add the `@` character before these attributes.

Let's set the `@title` attribute for our first `GameTile` to "Overwatch" and then let's set the second element to `@title="Mario Party Ultimate"`:

```html
<GameTile @title="Overwatch"/>
<GameTile style="background: blue" @title="Mario Party Ultimate"/>
```

Just setting this attribute won't magically change our output, but it does allow us to use this attribute value in our `GameTile` component.
Let's go to the `game-tile` template and replace our game title with curly braces and the value of the `@title` variable.
In Handlebars the double curly braces indicates that we want to have a piece of dynamic data using variable or helpers (which are like stored functions for our templates).

Now when we save our file, our page is changing with Overwatch and Mario Party Ultimate.
We can continue to make these changes by using more attributes for our component.

```html
<div class="game-tile">
  <h1>{{@title}} <span>{{@year}}</span></h1>
  <img
    alt
    role="presentation"
    src="{{@imageUrl}}"
  >
  <p>{{@description}}</p>
</div>
```

Then we'll need to set these attributes in our application template:

```html
<GameTile
  @title="Overwatch"
  @year="2016"
  @imageUrl="https://images.igdb.com/igdb/image/upload/t_cover_big/fen88hu0vhcf3k3owkxd.jpg"
  @description="A good first person shooter"
/>

<GameTile
  @title="Mario Party Ultimate"
  @year="2018"
  @imageUrl="https://images.igdb.com/igdb/image/upload/t_cover_big/rvadchpkfknklxmckmmk.jpg"
  @description="A great way to compete with friends!"
/>
```

Now we have two different GameTiles for our games.
We have our components with attributes that pass in data to be shown.
But, right now we are just passing in attributes directly to our components.
Instead, let's look at how we can work with JavaScript to get data into our components.

## Creating a List Component

To start, let's copy the `GameTile` components from `application.hbs` and let's replace them with a new `GameList` component.

```hbs
<GameList />
```

Then let's create the new `game-list.hbs` file for the new `GameList` component we just called.
Here, we'll paste in our `GameTiles` from before:

```hbs
<GameTile
  @title="Overwatch"
  @year="2016"
  @imageUrl="https://images.igdb.com/igdb/image/upload/t_cover_big/fen88hu0vhcf3k3owkxd.jpg"
  @description="A good first person shooter"
/>

<GameTile
  @title="Mario Party Ultimate"
  @year="2018"
  @imageUrl="https://images.igdb.com/igdb/image/upload/t_cover_big/rvadchpkfknklxmckmmk.jpg"
  @description="A great way to compete with friends!"
/>
```

Back in the browser this is working, but we've only moved around our code into a new component.
Instead let's start using JavaScript to create the data needed for our different GameTiles.

So far we've used only templates for our components.
If you've used React functional components or JSX only components you can think of Ember template only components in a very similar way.
But, there are times where we need to work with data and JavaScript logic, for this we need to use a class component along with our template.

Similar to the naming convention for our templates, if we want to add JavaScript for our component, we need to make sure our names match.
So, let's create a file called `game-list.js` in our `app/components` directory.

Here we need to export a component class so we'll start by importing `Component` from `@ember/component` and then exporting a new class that extends from this.
This should feel pretty standard for a JavaScript class.

Now before we jump in and load our list of games, let's look at how this JavaScript class file interacts with our template.
Let's create a new property on our class and set it to the string `Super Smash Bros`.

```js
import Component from '@ember/component';

export default class extends Component {
  title="Super Smash Bros"
}
```

Then, in our game-list template, let's try to access this value.
Before we were accessing component attributes and used the `@` symbol, but now we specifically want to work with the `title` property directly set on our component.
So, to do this we still need to use `{{}}` but now we'll just print out the value of `title` and let's place that in an `h2` to make it easier to see.

```hbs
<h2>{{this.title}}</h2>

<GameTile
  @title="Overwatch"
  @year="2016"
  @imageUrl="https://images.igdb.com/igdb/image/upload/t_cover_big/fen88hu0vhcf3k3owkxd.jpg"
  @description="A good first person shooter"
/>

<GameTile
  @title="Mario Party Ultimate"
  @year="2018"
  @imageUrl="https://images.igdb.com/igdb/image/upload/t_cover_big/rvadchpkfknklxmckmmk.jpg"
  @description="A great way to compete with friends!"
/>
```

Now we can see that our title value in our component JavaScript is being shown.
But, we're not limited to class properties and we can work with any JavaScript value (not just strings).
So, let's go back to our component class and add a constructor.
In our constructor we need to call `super` so that the default constructor is run.

Then, let's set a property called `games` on this and let's add in an array of objects for each of our games:

```js
import Component from '@ember/component';

export default class extends Component {
  constructor() {
    super(...arguments);

    this.games = [
      {
        title: "Overwatch",
        year: "2016",
        imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/fen88hu0vhcf3k3owkxd.jpg",
        description: "A good first person shooter",
      },
      {
        title: "Mario Party Ultimate",
        year: "2018",
        imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/rvadchpkfknklxmckmmk.jpg",
        description: "A great way to compete with friends!",
      }
    ];
  }
}
```

Now we need to work with this array of data.
To do this, we'll use a helper in our template to loop over our data.
Handlebars helpers are just JavaScript functions that we can run in our templates (there are a few provided out of the box with Ember and you can always create your own too!).
Now to loop through our data, we'll use the `each` helper which is sort of like `Array.map` in JavaScript when used with JSX.

Here we'll loop through all of our games then we'll use this `as |game|` syntax.
The `as ||` syntax in Handlebars is like passing in a callback where the variables in the pipes are the arguments for our callback.
Now in this each loop, let's first print out a `GameTile` for Overwatch just to make sure things work, and we can see there are 2 tiles on our screen.
Next, let's replace the attributes for our `GameTile` with values from our `game` variable in the each loop.

```hbs
{{#each this.games as |game|}}
  <GameTile
    @title={{game.title}}
    @year={{game.year}}
    @imageUrl={{game.imageUrl}}
    @description={{game.description}}
  />
{{/each}}
```

Now we are showing our list of games using an array of data from JavaScript.
But, we're not writing the best Ember code right now.

In our component we're using `this.games =` to change the value of `games` in our component.
This is ok since we're doing this work in the constructor before the Component is actually rendered.
Every time we create a component, Ember is tracking the values used in templates for changes.
This is how it knows when to re-render without us having to do any extra work.
To see why our `=` is a problem with tracking, let's start working on loading our data a bit more asynchronously.

In our component, let's create a `window.setTimeout` and let's set the value of `this.games` for our component after 100ms.
Before this `setTimeout` let's first start games as an empty array.

```js
constructor() {
  super(...arguments);
  this.games = [];

  window.setTimeout(() => {
    this.games = [
      {
        title: "Overwatch",
        year: "2016",
        imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/fen88hu0vhcf3k3owkxd.jpg",
        description: "A good first person shooter",
      },
      {
        title: "Mario Party Ultimate",
        year: "2018",
        imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/rvadchpkfknklxmckmmk.jpg",
        description: "A great way to compete with friends!",
      }
    ];
  }, 100);
}
```

> **Note** it's important that we use an arrow function here so that `this` in our callback still refers to our GameList component.

If we save this and look at our app, we now have no games showing up.
And, if we check the console we can see the error:

> You must use set() to set the `games` property (of <game-list@component:game-list::ember173>)

This is because the `games` property in our component was being watched for changes, so it's marked as immutable unless we call `set` so that we don't accidentally make a change that Ember can't track.
This is simliar to needing to call `setState` in React, except we only need to set the properties that change, and Ember is smart and only recalculates parts of our app that use those properties.

Back in the constructor, let's use `this.set` to set the `games` property to our new array.

```js
constructor() {
  super(...arguments);
  this.set('games', []);

  window.setTimeout(() => {
    this.set('games', [
      {
        title: "Overwatch",
        year: "2016",
        imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/fen88hu0vhcf3k3owkxd.jpg",
        description: "A good first person shooter",
      },
      {
        title: "Mario Party Ultimate",
        year: "2018",
        imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/rvadchpkfknklxmckmmk.jpg",
        description: "A great way to compete with friends!",
      }
    ]);
  }, 100);
}
```

Alright, now we can work with JavaScript data in our components, what about loading data from an API or server?

# Loading States and Async Values

So far, we've actually done most of the work needed to display the list of games from our server.
Now, we just need to actually load data using `fetch` or a library like Axios.
Before we do that though, let's look at how we can show a loading state in our GameList.

In the constructor, let's cut out the code for our timeout and then create a new async function called `loadData`.
In this `loadData` function let's first set a property called `loading` to `true`.
Then let's `await timeout(1000)` and then we'll set `loading` to `false` and we'll set `games` to our array of data.

```js
async loadData() {
  this.set('loading', true);
  await timeout(1000);
  this.set('loading', false);
  this.set('games', [
    {
      title: "Overwatch",
      year: "2016",
      imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/fen88hu0vhcf3k3owkxd.jpg",
      description: "A good first person shooter",
    },
    {
      title: "Mario Party Ultimate",
      year: "2018",
      imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/rvadchpkfknklxmckmmk.jpg",
      description: "A great way to compete with friends!",
    }
  ]);
}
```

Then let's define `timeout` with this small function that wraps `window.setTimeout` in a promise:

```js
const timeout = (t) => new Promise((r) => window.setTimeout(r, t));
```

And finally, let's call `loadData` in our `constructor`:

```js
constructor() {
  super(...arguments);
  this.set('games', []);

  this.loadData();
}
```

Let's look at this in the browser, if we refresh the page, we'll get our list of games after a second.
But, what about the loading state?

In our template, we can use the `if` helper and `else` helper to check the value of `loading` in our component:

```hbs
{{#if this.loading}}
  <h2 style="animation: spin 4s infinite linear; display: inline-block;">Loading</h2>
{{else}}
  {{#each this.games as |game|}}
    <GameTile
      @title={{game.title}}
      @year={{game.year}}
      @imageUrl={{game.imageUrl}}
      @description={{game.description}}
    />
  {{/each}}
{{/if}}
```

Now we have our loading state, let's load some real data from a server!

# Loading Data with Fetch

For this demo there is an API server that will return a list of games for the demo as well as the more advanced version of this tutorial.

The url for this is: `https://game-list-api.herokuapp.com/games`

Now to grab this data, we will need to update our `loadData` function to fetch data from this API.
To do this, we'll use the browser's built-in `fetch` function:

```js
async loadData() {
  this.set('loading', true);

  const req = await fetch('https://game-list-api.herokuapp.com/games', {
    credentials: 'include'
  });
  const games = await req.json();

  this.set('loading', false);
  this.set('games', games);
}
```

Now it looks like we have no data loading, but let's checkout the network tab.
Here we can see that the data is loading a bit differently than we expected.
Instead of the `game.title` we're getting a `name` property and there are a few other changes.
We could use a map function in `loadData` to normalize our data, but instead let's update the `GameList` component template to pass in the right values into `GameTile`:

```hbs
<GameTile
  @title={{game.name}}
  @year={{game.first_release_date}}
  @imageUrl={{game.cover.url}}
  @description={{game.summary}}
/>
```

Alright now our games list is grabbing data from our API!
There is one final issue that we have in our app.
The year is now showing a millisecond time stamp instead of the actual release year.
So we'll need to format this into the actual year value.

## Creating a Handlebars Helper

In Ember templates, we can't write regular JavaScript expressions.
Instead if we want to pass variables into functions we have to create Handlebars helpers.
These are just functions to be executed in a template, no magic, no special sauce.

To create a helper we need to go to the `app/helpers` folder and create a js file.
We'll name our helper `timestamp-to-year.js`.

In this helper file we need to import helper from `@ember/component/helper`.
This `helper` function defines a new Handlebars helper by taking a single argument: a callback to run when the helper is used in a template.
So, let's export a new helper from this module.

```js
import { helper } from '@ember/component/helper';

export default helper(() => {

});
```

Next, we need to define the logic of this function, to our callback we'll get two arguments, an array of ordered arguments and an object of named arguments.
We'll only work with a single value for the timestamp, so we can destructure the timestamp from the array of arguments.
Then to turn this timestamp into a year we need to create a new `Date` and then call `getFullYear`

```js
([timestamp]) => {
  const date = new Date(timestamp);

  return date.getFullYear();
}
```

Then we can use this new helper by calling `{{timestamp-to-year @year}}` in the `GameTile` component:

```hbs
<h1>{{@title}} <span>{{timestamp-to-year @year}}</span></h1>
```

For clarity, let's clean things up by renaming the `@year` attribute to `@timestamp` in our `GameTile` and we'll also need to update the `GameList` template too.

Now, we have a game list loading in data from an API, transforming timestamps into years and displaying all of our data to the end user.

In the full post you'll learn how to add a search bar to look for games and a feature to add and remove games from the list.
