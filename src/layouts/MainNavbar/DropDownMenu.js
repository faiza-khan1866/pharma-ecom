import * as React from "react";
import { NavDropdown } from "react-bootstrap";

export const DropDownMenu = (props) => {
  let divEl = React.useRef(HTMLDivElement);

  const onToggle = (show, meta) => {
    if (divEl.current) {
      if (show === false) {
        const element = divEl.current;
        if (element) {
          const children = element.querySelectorAll(".dropdown-menu.show");
          // @ts-ignore
          for (const child of children) {
            child.classList.remove("show");
          }
        }
      }
    }
    if (typeof props.onToggle === "function") {
      props.onToggle(show, meta);
    }
  };
  return (
    <NavDropdown
      ref={divEl}
      className={props.className}
      title={props.title}
      id={props.id}
      onToggle={onToggle}
      align={props.alignRight ? "end" : undefined}
      disabled={props.disabled}
      active={props.active}
      menuRole={props.menuRole}
      renderMenuOnMount={props.renderMenuOnMount}
      rootCloseEvent={props.rootCloseEvent}
      bsPrefix={props.bsPrefix}
      drop={props.drop}
      show={props.show}
      focusFirstItemOnShow={props.focusFirstItemOnShow}
    >
      {props.children}
    </NavDropdown>
  );
};
