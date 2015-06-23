return if typeof window is "undefined"

getById = (id)-> document.getElementById(id)

window.Authy.UI = ->

  dropdownHandler = null
  tooltipHandler  = null

  ###########
  # Public Members
  ###########

  @init = ->
    cellPhone = getById("authy-cellphone")
    if cellPhone
      new CellPhone({ element: cellPhone })

    token = getById("authy-token")
    if token
      new Token({ element: token })

    tooltip = getById("authy-help")
    if tooltip
      tooltipHandler = new Tooltip({ element: tooltip })

    dropdown = getById("authy-countries")
    if dropdown
      dropdownHandler = new Dropdown({ element: dropdown, defaultCountries: true, id: 0 })

  @searchItem = ->
    dropdownHandler.search()

  @autocomplete = (obj, hideList) ->
    dropdownHandler.autocomplete(obj, hideList)

  @setCountryCode = (countryCode) ->
    dropdownHandler.setCountryCode(countryCode)

  @setTooltip = (title, msg) ->
    tooltipHandler.set(title, msg)

  return #class return

Authy.UI.instance = ->
  unless @ui
    @ui = new Authy.UI()
    @ui.init()
  @ui

window.onload = ->
  Authy.UI.instance()
