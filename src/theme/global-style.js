import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background: linear-gradient(0.25turn,#f5d6a7,#fdc8e9,#bb8ceb) !important;
  height: 100% !important;
}

/*timepicker style*/
.react-datepicker__time-container
  .react-datepicker__time
  .react-datepicker__time-box
  ul.react-datepicker__time-list {
  padding-left: 0;
  padding-right: 0;
  width: 100px;
}

.react-datepicker__input-container {
  width: inherit;
}

.react-datepicker-wrapper {
  width: 100%;
}

/*home page styles*/
.masthead {
  background-image: radial-gradient(
    farthest-corner at 400px 100px,
    rgb(66, 24, 115) 0%,
    rgb(134, 33, 174) 69%,
    rgb(156, 32, 172) 89%
  ) !important;
}

.masthead.segment {
  min-height: 700px;
  padding: 1em 0 !important;
}

.masthead .ui.menu .ui.button,
.ui.menu a.ui.inverted.button {
  margin-left: 0.5em;
}

.masthead h1.ui.header {
  margin-top: 3em;
  margin-bottom: 0;
  font-size: 4em;
  font-weight: normal;
}

.masthead h2 {
  font-size: 1.7em;
  font-weight: normal;
}

.footer.segment {
  padding: 5em 0;
}

.secondary.inverted.pointing.menu {
  border: none;
}

/*end home page styles*/

/* navbar styles */

.ui.menu .item img.logo {
  margin-right: 1.5em;
}

.ui.fixed.menu {
  background-image: radial-gradient(
    farthest-corner at 400px 100px,
    rgb(66, 24, 115) 0%,
    rgb(134, 33, 174) 69%,
    rgb(156, 32, 172) 89%
  ) !important;
}

.ui.main.container,
.main.segment {
  margin-top: 7em;
}

.ui.center.aligned.segment.attendance-preview {
  background-color: #f5f5f5;
}

.masthead .ui.menu .ui.button,
.ui.menu a.ui.inverted.button {
  margin-left: 0.5em;
}

.ui.menu .item > img:not(.ui) {
  margin-right: 1.5em !important;
}

.ui.menu:not(.vertical) .item > .button {
  margin-left: 0.5em;
}

/*chat comments*/

.ui.comments .comment .comments {
  padding-bottom: 0 !important;
  padding-left: 2em !important;
}

/* .ui.segment {
  background-image: radial-gradient( farthest-corner at -6498px 33px, #f5f5f5 0%, #fff8ff 69%, #edddff 135% ) !important;
} */

body::-webkit-scrollbar {
  width: 0.7em;
}

body::-webkit-scrollbar-track {
  box-shadow: inset 0 0 4px rgba(0,0,0,0.3);
}

body::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  outline: 1px solid slategrey;
  border-radius: 20px;
}

`;

export default GlobalStyle;
