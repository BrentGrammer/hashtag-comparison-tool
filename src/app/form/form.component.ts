import { Component, OnInit } from "@angular/core";
import { FormGroup, FormArray, FormControl, Validators } from "@angular/forms";
import * as copy from "copy-to-clipboard";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"]
})
export class FormComponent implements OnInit {
  hashTagForm: FormGroup;
  result: string[];
  formSubmitted: boolean;

  constructor() {}

  ngOnInit() {
    this.formSubmitted = false;
    this.hashTagForm = new FormGroup({
      tagGroups: new FormArray([
        new FormControl(null, Validators.required),
        new FormControl(null, Validators.required)
      ])
    });
  }

  onAddTagGroupInput() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.hashTagForm.get("tagGroups")).push(control);
  }

  onRemoveTagGroupInput(index: number) {
    (<FormArray>this.hashTagForm.get("tagGroups")).removeAt(index);
  }

  getTagGroupControls() {
    return (this.hashTagForm.get("tagGroups") as FormArray).controls;
  }

  copyToClipboard(matchText) {
    copy(matchText);
  }

  onResetForm() {
    this.formSubmitted = false;
    this.hashTagForm.reset();
  }

  onSubmit() {
    this.formSubmitted = true;
    let { tagGroups } = this.hashTagForm.value;
    const tagGroupsCount = tagGroups.length;

    tagGroups = tagGroups.map(group => group.trim());

    const removeDups = arr => {
      return arr.filter((tag, idx, array) => {
        return array.indexOf(tag) === idx;
      });
    };

    const all = tagGroups.reduce((tags, group) => {
      const groupArr = group.split(/[\s\r\n,]+/);
      const cleanedGroup = removeDups(groupArr);
      return [...tags, ...cleanedGroup];
    }, []);

    const occurrences = all.reduce(function(counts, tag) {
      counts[tag] = counts[tag] + 1 || 1;
      return counts;
    }, {});

    const commonTags = Object.keys(occurrences).filter(key => {
      if (occurrences[key] === tagGroupsCount) return occurrences[key];
    });

    this.result = commonTags.length
      ? commonTags
      : ["No Common Hashtags found."];

    setTimeout(() => {
      const scrollingElement = document.scrollingElement || document.body;
      scrollingElement.scrollTop = scrollingElement.scrollHeight;
    }, 100);
  }
}
