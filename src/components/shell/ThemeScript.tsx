/** Sets data-theme before first paint so there is never a flash of the wrong theme. */
const code = `try{var t=localStorage.getItem("mesh-theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
