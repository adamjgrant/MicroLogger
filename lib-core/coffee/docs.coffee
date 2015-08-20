document.addEventListener 'DOMContentLoaded', ->

  window.$$ = (el) -> document.querySelectorAll(el)
  window.$ = (el) -> $$(el)[0]

  ###
  CRUD DOCUMENTATION SETTINGS
  ###

  # Default settings
  defaults =
    viewOptions:
      jquery: false
      semantic: true

  booleanViewOptions = ['jquery', 'semantic']

  # Retrieve user's saved settings
  options = JSON.parse localStorage.getItem 'kickstartDocs'

  # Create shallow extend function
  # (http://andrewdupont.net/2009/08/28/deep-extending-objects-in-javascript/)
  extend = (destination, source) ->
    for property of source
      if source[property] and source[property].constructor and source[property].constructor is Object
        destination[property] = destination[property] or {}
        arguments.callee destination[property], source[property]
      else
        destination[property] = source[property]
    destination

  # Extend from defaults
  settings = if options then extend defaults, options else defaults

  # Create function to write to localStorage
  setSettings = (settings) ->
    localStorage.setItem 'kickstartDocs', JSON.stringify settings

    for option in booleanViewOptions
      if settings.viewOptions["#{option}"]
        document.body.classList.add "show-#{option}"
      else
        document.body.classList.remove "show-#{option}"

  # Write to localStorage
  setSettings(settings)

  els = []
  for option in booleanViewOptions
    option = "#docs-#{option}"
    els.push option

  if $$(els).length
    # This page has checkboxes for view options.
    for option in booleanViewOptions
      # Closure needed for event listeners
      do (option) ->
        window["$opt#{option}"] = $ "#docs-#{option}"

        # Set state of buttons based on saved options in localStorage
        window["$opt#{option}"].checked = (if settings.viewOptions["#{option}"] then true else false)

        # Listen for checkbox changes
        window["$opt#{option}"].addEventListener 'click', ->
          settings.viewOptions["#{option}"] = this.checked
          setSettings settings

  # Show growls
  if k$.$('#example-showGrowl')
    k$.$('#example-showGrowl').addEventListener 'click', ->
      growls = [
        {
          title: 'Document Saved.',
          text: 'Your document was successfully saved.'
          type: 'alert-green'
        },
        {
          title: 'Library book not found'
          text: 'Sorry, we could find that library book.',
          type: 'alert-red'
        },
        {
          title: 'Wide clearance selection',
          text: 'Remember to check out our clearance',
          type: 'alert-blue'
        },
        {
          title: 'Deadline approaching',
          text: 'Friendly reminder that your deadline is quickly approaching.',
          type: 'alert-yellow'
        }
      ]

      k$.exampleCounter++
      k$.exampleCounter = 0 if not k$.exampleCounter or k$.exampleCounter > 3

      k$.growl growls[k$.exampleCounter]

  # Show status message
  if k$.$('#example-showStatus')
    k$.$('#example-showStatus').addEventListener 'click', ->
      statuses = [
        {
          text: 'Document Saved.',
          type: 'status-green'
        },
        {
          text: 'Sorry, we could find that library book.',
          type: 'status-red'
        },
        {
          text: 'Remember to check out our clearance',
          type: 'status-blue'
        },
        {
          text: 'Deadline is approaching!',
          type: 'status-yellow'
        }
      ]

      k$.exampleCounter++
      k$.exampleCounter = 0 if not k$.exampleCounter or k$.exampleCounter > 3

      k$.status(statuses[k$.exampleCounter])

  k$.slugify = (str) ->
    `str.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'')`

  # Create a table of contents

  if k$.$$('#toc').length
    k$.$('.creating-table').parentNode.removeChild k$.$('.creating-table')
    $toc = document.createElement 'ul'
    $toc.className = "list list-unstyled"
    $link = document.createElement('li')
    $link.innerHTML = '<a></a>'

    # Assuming proper html, start with h1.
    $headingLevel = 1

    # The node we're currently appending to. Always a ul.
    $targetNode = $toc

    $documentContainer = k$.$('.document-container')
    for heading in $documentContainer.querySelectorAll('h1, h2, h3, h4, h5, h6')
      # Ignore headings that declare themselves as exempt from the TOC
      if not heading.classList.contains 'toc-exempt'
        # For extra unique names.
        # heading.id = "#{k$.slugify heading.innerHTML}-#{_k}"

        heading.id = k$.slugify heading.innerHTML

        # If this is a lower level.
        $thisHeadingLevel = parseInt(heading.tagName.substr(1, 2))

        if $thisHeadingLevel > $headingLevel
          # Append a new submenu and make that the targetNode.
          $newSubmenu = document.createElement 'ul'
          $targetNode.children[$targetNode.children.length - 1].appendChild $newSubmenu 
          $targetNode = $newSubmenu
          $headingLevel = $thisHeadingLevel

        # If this is a higher level
        if $thisHeadingLevel < $headingLevel
          $stepsUp = $headingLevel - $thisHeadingLevel

          while $stepsUp > -1
            $targetNode = $targetNode.parentNode
            $stepsUp--

          $headingLevel = $thisHeadingLevel

        # Make a new li and append it to the target ul node.
        $menuItem = $link.cloneNode true
        $menuItem.querySelector('a').href = "##{heading.id}"
        $menuItem.querySelector('a').innerHTML = heading.innerHTML
        $targetNode.appendChild $menuItem

    k$.$('#toc').appendChild $toc
