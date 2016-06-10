import {InputType} from "./enums.model";

export class InputDefinition {
    type: InputType = InputType.None
    label: string
    icon: string
    placeholder: string
    readOnly: boolean = false
    values: Array<{id:string, value:any}> = []

    static fromMap(map: Object) : InputDefinition {
        var definition = new InputDefinition();

        Object.keys(map).forEach(property => {
            definition[property] = map[property];
        });

        return definition;
    }

    isNone() : boolean { return this.type == InputType.None }

    isHidden() : boolean { return this.type == InputType.Hidden }

    isMap() : boolean { return this.type == InputType.Map }

    isSelect() : boolean { return this.type == InputType.Select }

    isText() : boolean { return this.type == InputType.Text }

    isTextarea() : boolean { return this.type == InputType.Textarea }

    isCheckbox() : boolean { return this.type == InputType.Checkbox }

    isEntity() : boolean { return this.type == InputType.Entity }

    isEntityCollection() : boolean { return this.type == InputType.EntityCollection }
}