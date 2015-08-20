tabs = (el) ->

  # Accept both strings and elements.
  $tabContainer = if typeof el == 'string' then k$.$(el) else el

  $tabSet = $tabContainer.querySelectorAll('li')
  $tab.classList.add('tab-item') for $tab in $tabSet

  $paneSet = new Array()
  for $_tab in $tabSet
    $id = $_tab.querySelector('a').getAttribute('href')
    $pane = k$.$("article#{$id}")
    $pane.classList.add 'open' if $_tab.classList.contains 'open'
    $paneSet.push($pane)
    # $pane.dataset.panel = 'true' # Replace with this when IE10 support drops
    $pane.setAttribute('data-panel', true)

  for $tab in $tabSet
    # Create an array of panels by reading the links from each tab.
    $tabLink = $tab.querySelector('a')
    # $tabLink.dataset.link = $tabLink.getAttribute 'href' # Ibid
    $tabLink.setAttribute('data-link', $tabLink.getAttribute('href'))
    $tabLink.href = 'javascript:void(0);'

    do ($tab, $tabLink, $paneSet) ->
      $tab.addEventListener 'click', ->

        # Reset tabs and panes only in this tabset
        $pane.classList.remove 'open' for $pane in $paneSet
        _$tab.classList.remove 'open' for _$tab in $tabSet

        # Add an open class uniquely to this tab and pane.
        # k$.$("article#{$tabLink.dataset.link}").classList.add 'open' # Ibid
        k$.$("article#{$tabLink.getAttribute('data-link')}").classList.add 'open'
        $tab.classList.add 'open'

k$.tabs = tabs

module.exports = tabs
