import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {Information} from "./information";

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.component.html',
  imports: [
    NgForOf
  ],
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  cards: Information[] = [
    {title: "Bodybuilder", description: "Holden was Mr. Olympia for 4 consecutive years", image: '../assets/mexico.jpg'},
    {title: "Skier", description: "Holden is a 2-time Olympic Skiing gold medalist", image: '../assets/ski.jpg'},
    {title: "The Intimidator", description: "This look strikes fear into even the manliest of men", image: '../assets/scary.jpg'},
    {title: "Astronaut", description: "Holden was one of the original Apollo 11 astronauts", image: '../assets/astronaut.png'}
  ];
}
