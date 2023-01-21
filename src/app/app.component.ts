import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { CategoryOption, Project } from './app.interface';
import { CateProService } from './cate-pro.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  projects: Project[] = [];
  categoryOptions: CategoryOption[] = [];

  constructor(private cateProServ: CateProService) {}

  ngOnInit() {
    this.cateProServ.getData().subscribe((data: Project[]) => {
      this.projects = data;
      this.categoryOptions = this.buildCategoryOptions();
    });
  }

  drop(event: CdkDragDrop<Project[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    console.log(this.projects);
    console.log(this.categoryOptions);
  }

  private buildCategoryOptions(): CategoryOption[] {
    // get all cate names
    const categories = new Set<string>();

    this.projects.map((project) => {
      categories.add(project.category);
    });

    const categoriesOptions: CategoryOption[] = [];

    Array.from(categories).map((category) => {
      const data = this.projects.filter(
        (project) => project.category === category
      );

      categoriesOptions.push({
        name: category,
        projects: data,
      });
    });

    return categoriesOptions;
  }
}
