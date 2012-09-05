//enyo.kind({
//  name: 'Doc.Block',
//  style: 'background: #d2d4d5;'
//});
//
//enyo.kind({
//  name: 'Doc.App',
//  classes: 'row-fluid', // Bootstrap CSS class
//  components: [
//    {classes: 'span1', kind: 'Doc.Block', content: 'Col 1'}, // span1 is also a Bootstrap CSS class
//    {classes: 'span1', kind: 'Doc.Block', content: 'Col 2'},
//    {classes: 'span1', kind: 'Doc.Block', content: 'Col 3'},
//    {classes: 'span1', kind: 'Doc.Block', content: 'Col 4'},
//    {classes: 'span1', kind: 'Doc.Block', content: 'Col 5'},
//    {classes: 'span1', kind: 'Doc.Block', content: 'Col 6'},
//    {classes: 'span1', kind: 'Doc.Block', content: 'Col 8'},
//    {classes: 'span1', kind: 'Doc.Block', content: 'Col 9'},
//    {classes: 'span1', kind: 'Doc.Block', content: 'Col 10'},
//    {classes: 'span1', kind: 'Doc.Block', content: 'Col 11'},
//    {classes: 'span1', kind: 'Doc.Block', content: 'Col 12'},
//  ]
//});

// Defining the kind of each item in a list, in this case is a LI node
enyo.kind({
  name: 'Doc.UI.ListItem',
  tag: 'li',
  components: [
    {tag: 'a', attributes: { href: '#'}, name: 'label'} // it contains a A node
  ], 
  create: function () {
    this.inherited(arguments);
    this.$.label.setContent(this.label);
  }
});

// Defining the kind for the list, a UL node
enyo.kind({
  name: 'Doc.UI.List',
  tag: 'ul',
  published: {
    collection: null
  },
  collectionChanged: function () {
    enyo.forEach(this.collection.models, function (model) {
      this.createComponent({
        kind: 'Doc.UI.ListItem',
        label: model.get('_identifier')
      }).render();
    }, this);
  }
});

// Defining a Product model
Doc.Product = Backbone.Model.extend({});

// Defining a ProductList collection
Doc.ProductList = Backbone.Collection.extend({
  model: Doc.Product
});

// Defining the main App
enyo.kind({
  name: 'Doc.App',
  classes: 'pagination', // Bootstrap CSS class
  components: [
    {kind: 'Doc.UI.List', name: 'list'}
  ],
  create: function () {
    this.inherited(arguments);
    // data is a cached array of products, we create a new Backbone.Collection (ProductList)
    this.$.list.setCollection(new Doc.ProductList(data));
  }
});