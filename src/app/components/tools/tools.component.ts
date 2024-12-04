import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss'],
  imports: [CommonModule],

})
export class ToolsComponent implements OnInit {

  technologies = [
    {
      name: 'Autocad',
      image: 'technologies/autocad.jpg',
    },
    {
      name: 'Civil 3D',
      image: 'technologies/civil3d.jpg',
    },
    {
      name: 'Word',
      image: 'technologies/word.png',
    },
    {
      name: 'Excel',
      image: 'technologies/excel.png',
    },
    {
      name: 'Project',
      image: 'technologies/project.jpg',
    },
    {
      name: 'Photoshop',
      image: 'technologies/photoshop.png',
    },
  ]

  constructor() { }

  ngOnInit() {
  }

}
