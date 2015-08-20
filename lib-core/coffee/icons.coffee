icons = () ->

  #! svg4everybody v1.0.0 | github.com/jonathantneal/svg4everybody 
  uses = document.getElementsByTagName("use")
  requestAnimationFrame = window.requestAnimationFrame or window.setTimeout
  CACHE = {}
  # IE9TO11 = /Trident\/[567]\b/.test(navigator.userAgent) or (navigator.userAgent.match(/AppleWebKit\/(\d+)/) or [])[1] < 537
  IE9TO11 = true
  # Forcing this to shim regardless.
  embed = (svg, g) ->
    if g
      viewBox = g.getAttribute("viewBox")
      fragment = document.createDocumentFragment()
      clone = g.cloneNode(true)
      svg.setAttribute "viewBox", viewBox  if viewBox
      fragment.appendChild clone.childNodes[0]  while clone.childNodes.length
      svg.appendChild fragment
    return
  onload = ->
    xhr = this
    x = document.createElement("x")
    s = xhr.s
    x.innerHTML = xhr.responseText
    xhr.onload = ->
      s.splice(0).map (array) ->
        embed array[0], x.querySelector("#" + array[1].replace(/(\W)/g, "\\$1"))
        return

      return

    xhr.onload()
    return
  onframe = ->
    use = undefined
    while (use = uses[0])
      svg = use.parentNode
      url = use.getAttribute("xlink:href").split("#")
      url_root = url[0]
      url_hash = url[1]
      svg.removeChild use
      if url_root.length
        xhr = CACHE[url_root] = CACHE[url_root] or new XMLHttpRequest()
        unless xhr.s
          xhr.s = []
          xhr.open "GET", url_root
          xhr.onload = onload
          xhr.send()
        xhr.s.push [
          svg
          url_hash
        ]
        xhr.onload()  if xhr.readyState is 4
      else
        embed svg, document.getElementById(url_hash)
    requestAnimationFrame onframe
    return
  onframe()  if IE9TO11
  return

k$.icons = icons

module.exports = icons
