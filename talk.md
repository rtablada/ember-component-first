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
yarn global install -g ember-cli@latest
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

```html
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
We've started
