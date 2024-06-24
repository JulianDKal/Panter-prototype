import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Chart } from '../../Chart';
import { ChartElementComponent } from '../chart-element/chart-element.component';
import { NgFor } from '@angular/common';

enum Pages {
  SpringerNaturePage,
  WileyPage,
  BothPage
}

@Component({
  selector: 'app-overview-component',
  standalone: true,
  imports: [ChartElementComponent, NgFor],
  templateUrl: './overview-component.component.html',
  styleUrl: './overview-component.component.css'
})
export class OverviewComponentComponent {
  Pages = Pages;
  @Input() currentPage: Pages = Pages.SpringerNaturePage;
  @Output() pageChange: EventEmitter<Pages> = new EventEmitter<Pages>();
  @Output() dealSelected1: EventEmitter<string> = new EventEmitter<string>();


  selectedDeal1: string = '';
  
  togglePage(page: Pages): void {
    this.currentPage = page;
    this.pageChange.emit(this.currentPage); // Event an Elternkomponente senden
    this.selectedDeal1 = '';
  }

  bothPage(): void {
    this.currentPage = Pages.BothPage;
    this.pageChange.emit(this.currentPage); // Event an Elternkomponente senden
    this.selectedDeal1 = '';
  }

  onSelectDeal1(deal: string): void {
    this.selectedDeal1 = deal;
    this.dealSelected1.emit(this.selectedDeal1); // Event auslösen, um ausgewählten Deal zu übermitteln
  }
  
   

@Input() chartForGraph!:Chart;

dropdownOpen = false;
  selectedPortfolio = 'Themen';

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

selectPortfolio(portfolio: string) {
  this.selectedPortfolio = portfolio;
  this.dropdownOpen = false;
}

  selectedTopic: string = '';
  selectedDeal: string = '';

  topics = [
    { name: 'Engineering', info: 'Es gibt 652 Journals zu diesem Themenbereich.<br>Dies sind 14,1% der gesamten Journals.' },
    { name: 'Medicine & Public Health', info: 'Es gibt 606 Journals zu diesem Themenbereich.<br>Dies sind 13,1% der gesamten Journals.' },
    { name: 'Life Sciences', info: 'Es gibt 594 Journals zu diesem Themenbereich.<br>Dies sind 12,8% der gesamten Journals.' },
    { name: 'Medicine', info: 'Es gibt 301 Journals zu diesem Themenbereich.<br>Dies sind 6,49% der gesamten Journals.' },
    { name: 'Mathematics', info: 'Es gibt 233 Journals zu diesem Themenbereich.<br>Dies sind 5,03% der gesamten Journals.' },
    { name: 'Chemistry', info: 'Es gibt 214 Journals zu diesem Themenbereich.<br>Dies sind 4,62% der gesamten Journals.' },
    { name: 'Biomedicine', info: 'Es gibt 187 Journals zu diesem Themenbereich.<br>Dies sind 4,03% der gesamten Journals.' },
    { name: 'Social & Behavioral Sciences', info: 'Es gibt 184 Journals zu diesem Themenbereich.<br>Dies sind 3,97% der gesamten Journals.' },
    { name: 'Psychology', info: 'Es gibt 165 Journals zu diesem Themenbereich.<br>Dies sind 3,56% der gesamten Journals.' },
    { name: 'Business, Economics, Finance & Accounting', info: 'Es gibt 160 Journals zu diesem Themenbereich.<br>Dies sind 3,45% der gesamten Journals.' },
    { name: 'Computer Science', info: 'Es gibt 149 Journals zu diesem Themenbereich.<br>Dies sind 3,21% der gesamten Journals.' },
    { name: 'Health Science', info: 'Es gibt 149 Journals zu diesem Themenbereich.<br>Dies sind 3,21% der gesamten Journals.' },
    { name: 'Earth Sciences', info: 'Es gibt 125 Journals zu diesem Themenbereich.<br>Dies sind 2,7% der gesamten Journals.' },
    { name: 'Materials Science', info: 'Es gibt 97 Journals zu diesem Themenbereich.<br>Dies sind 2,09% der gesamten Journals.' },
    { name: 'Nursing, Dentristry & Healthcare', info: 'Es gibt 94 Journals zu diesem Themenbereich.<br>Dies sind 2,07% der gesamten Journals.' },
    { name: 'Social Sciences', info: 'Es gibt 92 Journals zu diesem Themenbereich.<br>Dies sind 1,98% der gesamten Journals.' },
    { name: 'Earth, Space & Environmental Sciences', info: 'Es gibt 86 Journals zu diesem Themenbereich.<br>Dies sind 1,92% der gesamten Journals.' },
    { name: 'Economics', info: 'Es gibt 83 Journals zu diesem Themenbereich.<br>Dies sind 1,79% der gesamten Journals.' },
    { name: 'Business and Management', info: 'Es gibt 74 Journals zu diesem Themenbereich.<br>Dies sind 1,6% der gesamten Journals.' },
    { name: 'Education', info: 'Es gibt 73 Journals zu diesem Themenbereich.<br>Dies sind 1,57% der gesamten Journals.' },
    { name: 'Humanities', info: 'Es gibt 71 Journals zu diesem Themenbereich.<br>Dies sind 1,53% der gesamten Journals.' },
    { name: 'Environment', info: 'Es gibt 66 Journals zu diesem Themenbereich.<br>Dies sind 1,42% der gesamten Journals.' },
    { name: 'Agriculture, Aquaculture & Food Science', info: 'Es gibt 64 Journals zu diesem Themenbereich.<br>Dies sind 1,38% der gesamten Journals.' },
    { name: 'Philosophy', info: 'Es gibt 60 Journals zu diesem Themenbereich.<br>Dies sind 1,29% der gesamten Journals.' },
    { name: 'Statistics', info: 'Es gibt 26 Journals zu diesem Themenbereich.<br>Dies sind 0.561% der gesamten Journals.' },
    { name: 'Political Sciences and International Relations', info: 'Es gibt 25 Journals zu diesem Themenbereich.<br>Dies sind 0,539% der gesamten Journals.' },
  ];

  deals = [
    { name: 'Wiley Deal', info: 'Info about Deal 1' },
    { name: 'Springer Deal', info: 'Info about Deal 2' },
    { name: 'Alle Deals', info: 'Info about Deal 2' },
    { name: 'neuen Deal erstellen', info: 'Info about Deal 2' },
  ];

  onSelectTopic(topic: string, event: Event) {
    event.preventDefault();
    this.selectedTopic = topic;
  }

  onSelectDeal(deal: string, event: Event) {
    event.preventDefault();
    this.selectedDeal = deal;
  }

  getSelectedTopicInfo(): string {
    const topic = this.topics.find(t => t.name === this.selectedTopic);
    return topic ? topic.info : '';
  }

  getSelectedDealInfo(): string {
    const deal = this.deals.find(d => d.name === this.selectedDeal);
    return deal ? deal.info : '';
  }
}
