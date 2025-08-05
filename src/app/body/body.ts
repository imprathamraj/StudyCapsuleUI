import { Component, OnInit } from '@angular/core';
import { Capsules } from '../services/capsules';
import { Capsule } from '../model/capsule';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './body.html',
  styleUrls: ['./body.css'],
})
export class Body implements OnInit {
  capsules: Capsule[] = [];

  newCapsule: Capsule = {
    capsuleId: 0,
    capsuleType: '',
    capsulePrice: 0,
  };

  editCapsule: Capsule = {
    capsuleId: 0,
    capsuleType: '',
    capsulePrice: 0,
  };

  capsuleFormModel: Capsule = {
    capsuleId: 0,
    capsuleType: '',
    capsulePrice: 0,
  };

  isEditMode: boolean = false;

  constructor(private capsulesService: Capsules) {}

  ngOnInit(): void {
    this.getCapsules();
  }

  // ✅ GET: Load all capsules
  getCapsules(): void {
    this.capsulesService.getAllCapsules().subscribe((data: Capsule[]) => {
      this.capsules = data;
    });
  }

  // ✅ Unified submit for Add or Update
  submitCapsule(): void {
    if (this.isEditMode) {
      this.capsulesService
        .updateCapsule(this.capsuleFormModel.capsuleId, this.capsuleFormModel)
        .subscribe((updated: Capsule) => {
          const index = this.capsules.findIndex(
            (c) => c.capsuleId === updated.capsuleId
          );
          if (index !== -1) this.capsules[index] = updated;
          this.resetForm();
        });
    } else {
      this.capsulesService
        .addCapsule(this.capsuleFormModel)
        .subscribe((added: Capsule) => {
          this.capsules.push(added);
          this.resetForm();
        });
    }
  }

  // ✅ Trigger edit mode and populate form
  setEditCapsule(capsule: Capsule): void {
    this.capsuleFormModel = { ...capsule };
    this.isEditMode = true;
  }

  // ✅ DELETE: Remove capsule and update UI
  deleteCapsule(id: number): void {
    this.capsulesService.deleteCapsule(id).subscribe(() => {
      this.capsules = this.capsules.filter((c) => c.capsuleId !== id);
    });
  }

  // ✅ Reset form to default state
  resetForm(): void {
    this.capsuleFormModel = { capsuleId: 0, capsuleType: '', capsulePrice: 0 };
    this.isEditMode = false;
  }
}
