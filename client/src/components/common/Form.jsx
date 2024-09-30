
// import { SelectContent } from "@radix-ui/react-select"
import React from 'react'
import { Input } from '../ui/input';
import { Label } from '../ui/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Button } from "../ui/button";


const types = {
  input: "input",
  select: "select",
  textarea: "textarea"
}

const Form = ({ formControls, formData, setFormData, onSubmit, buttonText, isBtnDisabled }) => {

  function renderInputsByComponetsType(getControlItem) {

    let element = null;

    const value = formData[getControlItem.name] || "";



    switch (getControlItem.componentType) {
      case types.input:
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={e => setFormData({ ...formData, [getControlItem.name]: e.target.value })}
          />
        )
        break;
      case types.select:
        element = (
          <Select value={value} onValueChange={(value) => setFormData({
            ...formData,
            [getControlItem.name]: value
          })}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItem.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {
                getControlItem.options && getControlItem.options.length > 0 ? getControlItem.options.map(optionItem => <SelectItem key={optionItem.id} value={optionItem.id}>{optionItem.label}</SelectItem>) : null
              }
            </SelectContent>
          </Select>

        )
        break;
      case types.textarea:
        element = (
          <Textarea
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.id}
            value={value}
            onChange={e => setFormData({ ...formData, [getControlItem.name]: e.target.value })}

          />
        )
        break;

      default:
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            onChange={e => setFormData({ ...formData, [getControlItem.name]: e.target.value })}
          />
        )
        break;
    }

    return element;
  }

  return (
    <form onSubmit={onSubmit}>
      <div className='flex flex-col gap-3'>
        {
          formControls.map((controlItem) => {
            return (
              <div key={controlItem.name} className='grid w-full gap-1.5'>
                <Label htmlFor="controlItem.name" className='mb-1'>{controlItem.label}</Label>
                {
                  renderInputsByComponetsType(controlItem)
                }
              </div>
            )
          })
        }
      </div>

      <Button disabled={isBtnDisabled} type="submit" className="mt-2 w-full">{buttonText || "Submit"}</Button>


    </form>
  )
}

export default Form