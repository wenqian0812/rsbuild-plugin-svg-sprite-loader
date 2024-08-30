import './index.css';

document.querySelector('#root').innerHTML = `
<div class="content">
  <h1>rsbuild-plugin-svg-sprite-loader</h1>
  <p>rsbuild-plugin-svg-sprite-loader</p>
  <p class="icons">
    <svg class="svg-icon" aria-hidden="true" style="color: red">
      <use href="#icon-copy" />
    </svg>
  </p>
</div>
`;
