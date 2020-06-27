import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BudgetItem} from '../../shared/models/budget-item.model';
import {MatDialog} from '@angular/material/dialog';
import {EditItemModelComponent} from '../edit-item-model/edit-item-model.component';

@Component({
  selector: 'app-budget-item-list',
  templateUrl: './budget-item-list.component.html',
  styleUrls: ['./budget-item-list.component.scss']
})

export class BudgetItemListComponent implements OnInit {

  @Input() budgetItems: BudgetItem[];
  @Output() delete: EventEmitter<BudgetItem> = new EventEmitter<BudgetItem>();
  @Output() update: EventEmitter<UpdateEvent> = new EventEmitter<UpdateEvent>();

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onDeleteButtonClicked(items: BudgetItem) {
    this.delete.emit();
  }

  onCardClicked(items: BudgetItem) {
    const dialogRef = this.dialog.open(EditItemModelComponent, {
      width: '580px',
      data: items
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        // this.budgetItems[this.budgetItems.indexOf(items)] = result;

        this.update.emit({
          old: items,
          newOne: result
        });
      }
    });

  }
}

export interface UpdateEvent {
  old: BudgetItem;
  newOne: BudgetItem;
}
