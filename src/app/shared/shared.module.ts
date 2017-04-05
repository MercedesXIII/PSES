import { NgModule } from '@angular/core';

import { MenuItems } from './menu-items/menu-items';
import { AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective } from './accordion';
import { ToggleFullscreenDirective } from './fullscreen/toggle-fullscreen.directive';

import { Ng2CompleterModule } from "ng2-completer";

@NgModule({
  imports: [Ng2CompleterModule],
  declarations: [AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective, ToggleFullscreenDirective],
  exports: [AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective, ToggleFullscreenDirective],
  providers: [MenuItems]
})
export class SharedModule { }