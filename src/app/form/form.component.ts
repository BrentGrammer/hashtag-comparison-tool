import { Component, OnInit } from "@angular/core";
import { FormGroup, FormArray, FormControl, Validators } from "@angular/forms";
import * as copy from "copy-to-clipboard";
import { HashtagsService } from "./hashtags.service";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"],
  providers: [HashtagsService]
})
export class FormComponent implements OnInit {
  hashTagForm: FormGroup;
  commonHashtags: string[];
  formSubmitted: boolean;

  constructor(private hashtagsService: HashtagsService) {}

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

  copyToClipboard(text: string) {
    copy(text);
  }

  onResetForm() {
    this.formSubmitted = false;
    this.hashTagForm.reset();
  }

  onSubmit() {
    this.formSubmitted = true;
    let { tagGroups } = this.hashTagForm.value;

    this.commonHashtags = this.hashtagsService.getCommonHashtags(tagGroups);

    setTimeout(() => {
      const scrollingElement = document.scrollingElement || document.body;
      scrollingElement.scrollTop = scrollingElement.scrollHeight;
    }, 100);
  }
}
