import { Component, input, output, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-chat-toolbar',
  templateUrl: './chat-toolbar.component.html',
  styleUrl: './chat-toolbar.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    MatButtonModule,
  ],
})
export class ChatToolbarComponent {
  // Inputs
  viewMode = input<'events' | 'traces'>('events');
  invocationIdFilterActive = input<boolean>(false);
  nodePathFilterActive = input<boolean>(false);
  invocationIdFilter = input<string>('');
  nodePathFilter = input<string>('');
  hideIntermediateEvents = input<boolean>(false);
  invocationIdOptions = input<string[]>([]);
  nodePathOptions = input<string[]>([]);
  invocationDisplayMap = input<Map<string, string>>(new Map());
  chatType = input<string>('session');
  isTokenStreamingEnabled = input<boolean>(false);
  canEditSession = input<boolean>(true);
  useSse = input<boolean>(false);
  isSideBySide = input<boolean>(false);

  // Outputs
  viewModeChange = output<'events' | 'traces'>();
  invocationIdFilterActiveChange = output<boolean>();
  nodePathFilterActiveChange = output<boolean>();
  invocationIdFilterChange = output<string>();
  nodePathFilterChange = output<string>();
  clearAllFilters = output<Event>();
  toggleHideIntermediateEvents = output<void>();
  toggleSse = output<void>();
  toggleSideBySide = output<void>();

  // View Children
  readonly invChipMenuTrigger = viewChild<MatMenuTrigger>('invChipMenuTrigger');
  readonly nodeChipMenuTrigger = viewChild<MatMenuTrigger>('nodeChipMenuTrigger');
  readonly addMenuTrigger = viewChild<MatMenuTrigger>('addMenuTrigger');

  openAddFilterMenu(event: Event) {
    event.stopPropagation();
    this.addMenuTrigger()?.openMenu();
  }

  addInvocationIdFilter() {
    this.invocationIdFilterActiveChange.emit(true);
    setTimeout(() => {
      this.invChipMenuTrigger()?.openMenu();
    });
  }

  addNodePathFilter() {
    this.nodePathFilterActiveChange.emit(true);
    setTimeout(() => {
      this.nodeChipMenuTrigger()?.openMenu();
    });
  }

  removeInvocationIdFilter(event: Event) {
    event.stopPropagation();
    this.invocationIdFilterActiveChange.emit(false);
    this.invocationIdFilterChange.emit('');
  }

  removeNodePathFilter(event: Event) {
    event.stopPropagation();
    this.nodePathFilterActiveChange.emit(false);
    this.nodePathFilterChange.emit('');
  }

  setInvocationIdFilter(id: string) {
    this.invocationIdFilterChange.emit(id);
  }

  setNodePathFilter(path: string) {
    this.nodePathFilterChange.emit(path);
  }

  onInvocationMenuClosed() {
    if (!this.invocationIdFilter()) {
      this.invocationIdFilterActiveChange.emit(false);
    }
  }

  onNodePathMenuClosed() {
    if (!this.nodePathFilter()) {
      this.nodePathFilterActiveChange.emit(false);
    }
  }
}
