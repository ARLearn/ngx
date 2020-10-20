

<h1>Landingspagina game</h1>

<h1>About game</h1>

<a href="https://arlearn-eu.appspot.com<%= request.getRequestURI() %>">open game</a>

<h2>deeplink</h2>

<a href="arlearn://arlearn-eu.appspot.com<%= request.getRequestURI() %>">open game</a>

<h2>JSP URI, URL, Context</h2>

Request Context Path: <%= request.getContextPath() %>
Request URI:          <%= request.getRequestURI() %>
Request URL:          <%= request.getRequestURL() %>
