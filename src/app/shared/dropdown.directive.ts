import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
} from "@angular/core";

@Directive({
  selector: "[appDropdown]",
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;

  constructor(private elRef: ElementRef) {}
  
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    //onde eu cliquei (event: Event) é a tag html que tem o appDropdown (this.elRef.nativeElement)?
    this.isOpen = this.elRef.nativeElement.contains(event.target)
      ? !this.isOpen
      : false;
  }
}
