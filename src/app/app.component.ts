import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  serverElements = [];

  onServerAdded(newServer: {name: string, content: string}) {
    this.serverElements.push({
      type: 'server',
      name: newServer.name,
      content: newServer.content
    });
  }

  onBlueprintAdded(newBlueprint: {name: string, content: string}) {
    this.serverElements.push({
      type: 'blueprint',
      name: newBlueprint.name,
      content: newBlueprint.content
    });
  }
  
}
