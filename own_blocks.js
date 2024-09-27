Blockly.JavaScript = new Blockly.Generator("JavaScript")
Blockly.Blocks['ext_logic_andor'] = {
  init: function() {
    this.appendValueInput("LEFT")
        .setCheck("Boolean");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["and","&&"], ["or","||"], ["xor","^"]]), "BOOL");
    this.appendValueInput("RIGHT")
        .setCheck("Boolean");
    this.setOutput(true, "Boolean");
    this.setColour(0);
 this.setTooltip("This returns whether both booleans are true for 'and', whether one of the booleans are true for 'or', whether only one of the booleans are true for 'xor'.");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript.forBlock['ext_logic_andor'] = function(block, generator) {
  const dropdown_bool = block.getFieldValue('BOOL')
  const a = dropdown_bool == "^" ? ["!!(", ")"] : ["", ""]
  const value_left = generator.valueToCode(block, 'LEFT', 1) || "false"
  const value_right = generator.valueToCode(block, 'RIGHT', 1) || "false"
  return [a[0] + value_left + " " + dropdown_bool + " " + value_right + a[1], dropdown_bool == "^" ? 0 : 1]
}
Blockly.Blocks['ext_logic_not'] = {
  init: function() {
    this.appendValueInput("BOOL")
        .setCheck("Boolean")
        .appendField("not");
    this.setInputsInline(false);
    this.setOutput(true, "Boolean");
    this.setColour(0);
 this.setTooltip("");
 this.setHelpUrl("This returns the opposite of the boolean value provided.");
  }
};
Blockly.JavaScript.forBlock['ext_logic_not'] = function(block, generator) {
  const value = generator.valueToCode(block, 'BOOL', 0.1) || "false"
  return ["!" + value, 0]
}
Blockly.Blocks['ext_logic_bool'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["true","true"], ["false","false"]]), "BOOL");
    this.setInputsInline(true);
    this.setOutput(true, "Boolean");
    this.setColour(0);
 this.setTooltip("This returns a true or false value.");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript.forBlock['ext_logic_bool'] = function(block, generator) {
  return [block.getFieldValue('BOOL'), -1]
}
Blockly.Blocks['ext_logic_random'] = {
  init: function() {
    this.appendValueInput("PERCENTAGE")
        .setCheck("Number")
        .appendField("random chance of");
    this.setInputsInline(false);
    this.setOutput(true, "Boolean");
    this.setColour(0);
 this.setTooltip("This returns a possibility of getting false (0%) or true (100%) unpredictably.");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript.forBlock['ext_logic_random'] = function(block, generator) {
  let number = generator.valueToCode(block, 'PERCENTAGE', 0.1)
  let isc = false
  if (/^[0-9.]+$/.test(number) || number == "") { //  If the number is a constant value
    number = number == "" ? 50 : Number(number)
    isc = true
  }
  return [isc ? (number <= 0 ? "false" : number >= 100 ? "true" : ("Math.random() < " + (number / 100 || "50"))) : ("Math.random() < " + (number || "50") + " / 100"), isc ? (number <= 0 || number >= 100 ? -1 : 1) : 1]
}
Blockly.Blocks['ext_logic_compare'] = {
  init: function() {
    this.appendValueInput("LEFT")
        .setCheck(null);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["is equal to","==="], ["is not equal to","!=="]]), "EQUAL");
    this.appendValueInput("RIGHT")
        .setCheck(null);
    this.setOutput(true, "Boolean");
    this.setColour(0);
 this.setTooltip("This returns if both values are exactly the same (is equal to), or if both values are exactly not equal to each other (is not equal to).");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript.forBlock['ext_logic_compare'] = function(block, generator) {
  return [(generator.valueToCode(block, 'LEFT', 2) || "null") + " " + block.getFieldValue('EQUAL') + " " + (generator.valueToCode(block, 'RIGHT', 2) || "null"), 2]
}
Blockly.Blocks['ext_logic_if'] = {
  init: function() {
    this.appendValueInput("CONDITION")
        .setCheck(["Boolean", "canBool"])
        .appendField("if");
    this.appendStatementInput("CODE")
        .setCheck(null)
        .appendField("then");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
 this.setTooltip("The blocks inside the statement would run if the condition is truthy. Otherwise, nothing else happens.");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript.forBlock['ext_logic_if'] = function(block, generator) {
  return "if (" + (generator.valueToCode(block, 'CONDITION', 999) || "false") + ") {\n" + generator.statementToCode(block, 'CODE') + "}\n"
}
Blockly.Blocks['ext_string_literal'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("\"")
        .appendField(new Blockly.FieldTextInput(""), "TEXT")
        .appendField("\"");
    this.setOutput(true, "String");
    this.setColour(30);
 this.setTooltip("This returns a string value containing any text you typed into the field value.");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript.forBlock['ext_string_literal'] = function(block, generator) {
  return ["\"" + block.getFieldValue('TEXT').replace(/\\/g, "\\\\").replace(/"/g, "\\\"") + "\"", -2]
}
Blockly.Blocks['ext_string_length'] = {
  init: function() {
    this.appendValueInput("TEXT")
        .setCheck("String")
        .appendField("length of text");
    this.setOutput(true, "Number");
    this.setColour(30);
 this.setTooltip("This returns the number of all letters individually in a string literal.");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript.forBlock['ext_string_length'] = function(block, generator) {
  return [(generator.valueToCode(block, 'TEXT', 0) || "\"\"") + ".length", -2]
}
Blockly.Blocks['ext_logic_ternary'] = {
  init: function() {
    this.appendValueInput("CONDITION")
        .setCheck("Boolean")
        .appendField("if");
    this.appendValueInput("TRUE")
        .setCheck(null)
        .appendField("return");
    this.appendValueInput("FALSE")
        .setCheck(null)
        .appendField("else, return");
    this.setOutput(true, null);
    this.setColour(0);
 this.setTooltip("This returns the middle value if the condition is true, and this returns the bottom value if the condition is false.");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript.forBlock['ext_logic_ternary'] = function(block, generator) {
  return [(generator.valueToCode(block, 'CONDITION', 3) || "false") + " ? " + (generator.valueToCode(block, 'TRUE', 3) || "null") + " : " + (generator.valueToCode(block, 'FALSE', 3) || "null"), 4]
}
Blockly.Blocks['ext_string_includes'] = {
  init: function() {
    this.appendValueInput("TEXT")
        .setCheck("String")
        .appendField("text");
    this.appendValueInput("TARGET")
        .setCheck("String")
        .appendField(new Blockly.FieldDropdown([["includes","i"], ["doesn't include","I"], ["starts with","s"], ["ends with","S"]]), "TYPE");
    this.setOutput(true, "Boolean");
    this.setColour(30);
 this.setTooltip("This returns if a string exactly includes another string (includes), or if a string doesn't exactly include another string (doesn't include), if a string exactly starts with another string (starts with), or if a string exactly ends with another string (ends with).");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript.forBlock['ext_string_includes'] = function(block, generator) {
  const fv = block.getFieldValue('TYPE')
  return [(fv === "I" ? "!" : "") + (generator.valueToCode(block, 'TEXT', 10) || "\"\"") + {i: ".includes", I: ".includes", s: ".startsWith", S: ".endsWith"}[fv] + "(" + (generator.valueToCode(block, 'TARGET', 10) || "\"\"") + ")", -1]
}
Blockly.Blocks['ext_string_reverse'] = {
  init: function() {
    this.appendValueInput("TEXT")
        .setCheck("String")
        .appendField("reverse text");
    this.setOutput(true, "String");
    this.setColour(30);
 this.setTooltip("This would return each letter in a text being in a reversed order.");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript.forBlock['ext_string_reverse'] = function(block, generator) {
  const fv = generator.valueToCode(block, 'TEXT', 10) || "\"\""
  const functionName = Blockly.JavaScript.provideFunction_(
      'reverseText', 
      ['function ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ + '(text) {',
       '  return text.split("").reverse().join("");',
       '}']);
  return [functionName + "(" + fv + ")", -1]
}
Blockly.Blocks['ext_string_sub'] = {
  init: function() {
    this.appendValueInput("TEXT")
        .setCheck("String")
        .appendField("letters from text");
    this.appendValueInput("FROM")
        .setCheck(["Number", "Integer"])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("from");
    this.appendValueInput("TO")
        .setCheck(["Number", "Integer"])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("to");
    this.setOutput(true, "String");
    this.setColour(30);
 this.setTooltip("This would return the same text, but only including letters from (from input) to (to input).");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript.forBlock['ext_string_sub'] = function(block, generator) {
  let numberFrom = generator.valueToCode(block, 'FROM', 0)
  let numberTo = generator.valueToCode(block, 'TO', 0)
  let text = generator.valueToCode(block, 'TEXT', 0) || "\"\""
  let iscFrom = false
  let iscTo = false
  if (/^[0-9.]+$/.test(numberFrom) || numberFrom == "") { //  If the number is a constant value
    numberFrom = numberFrom == "" ? 1 : Number(numberFrom)
    iscFrom = true
  }
  if (/^[0-9.]+$/.test(numberTo) || numberTo == "") { //  If the number is a constant value
    numberTo = numberTo == "" ? 3 : Number(numberTo)
    iscTo = true
  }
  function t(bool, n) {
    return bool ? n - 1 : n + " - 1"
  }
  return [text + ".slice(" + t(iscFrom, numberFrom) + ", " + t(iscTo, numberTo) + ")", -1]
}
Blockly.Blocks['ext_number_literal'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldNumber(0), "NUM");
    this.setOutput(true, "Number");
    this.setColour(45);
 this.setTooltip("This returns any number that is in the input.");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript.forBlock['ext_number_literal'] = function(block, generator) {
  return [block.getFieldValue('NUM'), -3]
}
Blockly.Blocks['ext_number_arithmetic'] = {
  init: function() {
    this.appendValueInput("LEFT")
        .setCheck(["Number", "Integer"]);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["+"," + "], ["-"," - "], ["*"," * "], ["/"," / "], ["^",", "]]), "OPERATOR");
    this.appendValueInput("RIGHT")
        .setCheck(["Number", "Integer"]);
    this.setOutput(true, "Number");
    this.setColour(45);
 this.setTooltip("This returns the correct answer to the constructed math problem.");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript.forBlock['ext_number_arithmetic'] = function(block, generator) {
  const a = block.getFieldValue('OPERATOR')
  return [(a == ", " ? "Math.pow(" : "") + (generator.valueToCode(block, 'LEFT', 0) || "0") + a + (generator.valueToCode(block, 'RIGHT', ([" / ", " * "].includes(a) ? -2 : 0)) || "0") + (a == ", " ? ")" : ""), {" + ": -1, " - ": -1, " * ": 1, " / ": 1, ", ": -1}[a]]
}
Blockly.Blocks['ext_string_letter'] = {
  init: function() {
    this.appendValueInput("LETTER")
        .setCheck(["Number", "Integer"])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("letter");
    this.appendValueInput("TEXT")
        .setCheck("String")
        .appendField("from text");
    this.setOutput(true, "String");
    this.setColour(30);
 this.setTooltip("This returns the correct answer to the constructed math problem.");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript.forBlock['ext_string_letter'] = function(block, generator) {
  let number = generator.valueToCode(block, 'LETTER', 0)
  let isc = false
  if (/^[0-9.]+$/.test(number) || number == "") { //  If the number is a constant value
    number = number == "" ? 1 : Number(number)
    isc = true
  }
  return [(generator.valueToCode(block, 'TEXT', 2) || "\"\"") + "[" + (isc ? number - 1 : number + " - 1") + "]", 2]
}
Blockly.Blocks['ext_string_replace'] = {
  init: function() {
    const dropdown = new Blockly.FieldDropdown([
      ["all of","g"], 
      ["only one of",""], 
      ["case-insensitively all of","gi"], 
      ["case-insensitively only one of","i"],
      ["[THIS IS REMOVED LATER]", ""]
    ], this.updateSerializableLabel_.bind(this));
    this.appendValueInput("TEXT")
        .setCheck("String")
        .appendField("in text");
    this.appendValueInput("TARGET")
        .setCheck("String")
        .appendField("replace")
        .appendField(dropdown, "TYPE");
    this.appendValueInput("REPLACEMENT")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(new Blockly.FieldLabelSerializable(""), "SERIALIZABLE")
        .appendField("with");
    this.setOutput(true, "String");
    this.setColour(30);
    this.setTooltip("")
    this.setHelpUrl("");
    dropdown.menuGenerator_ = [["all of","g"], 
      ["only one of",""], 
      ["case-insensitively all of","gi"], 
      ["case-insensitively only one of","i"]] // This is to help make sure that the text doesn't have rearranged words
  },
  updateSerializableLabel_: function(newValue) {
    let labelText, dropdownText, index
    switch (newValue) {
      case 'gi':
        labelText = 'case-insensitively'
        dropdownText = 'all of'
        index = 2
        break
      case 'i':
        labelText = 'case-insensitively'
        dropdownText = 'only one'
        index = 3
        break
      default:
        labelText = ''
    }
    this.getField("SERIALIZABLE").setValue(labelText)
    if (dropdownText) {
      this.getField("TYPE").menuGenerator_[index] = [dropdownText, newValue]
      if (index == 3) {
        this.getField("TYPE").menuGenerator_[2] = ["case-insensitively all of", "gi"]
      } else {
        this.getField("TYPE").menuGenerator_[3] = ["case-insensitively only one of", "i"]
      }
    } else {
      this.getField("TYPE").menuGenerator_[3] = ["case-insensitively only one of", "i"]
      this.getField("TYPE").menuGenerator_[2] = ["case-insensitively all of", "gi"]
    }
  }
};
Blockly.JavaScript.forBlock['ext_string_replace'] = function(block, generator) {
  const fv = generator.valueToCode(block, 'TEXT', 10) || "\"\""
  const target = generator.valueToCode(block, 'TARGET', 10) || "\"\""
  const replacement = generator.valueToCode(block, 'REPLACEMENT', 10) || "\"\""
  const functionName = Blockly.JavaScript.provideFunction_(
      'replace', 
      ['function ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ + '(text, target, replacement, flag) {',
       '  return text.replace(new RegExp(target.replace(/\\\\/g, "\\\\\\\\").replace(/[\\\\^$*+?.()|[\\]{}]/g, "\\\\$&"), flags), replacement);',
       '}']);
  return [functionName + "(" + fv + ", " + target + ", " + replacement + ", \"" + block.getFieldValue("TYPE") + "\")", -1]
}
Blockly.Blocks['ext_integer_literal'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldNumber(0, -Infinity, Infinity, 1), "INT");
    this.setOutput(true, "Integer");
    this.setColour(75);
 this.setTooltip("This returns any number that is in the input, except this is an integer value.");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript.forBlock['ext_integer_literal'] = function(block, generator) {
  return [block.getFieldValue('INT'), -3]
}
Blockly.Blocks['ext_number_random'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldLabelSerializable("random fraction"), "TEXT");
    this.appendValueInput("PRECISE")
        .setCheck("Boolean")
        .appendField("is precise?");
    this.setOutput(true, "Number");
    this.setColour(45);
    this.setTooltip("This returns a precise/nonprecise random fraction. The precision depends on whether the boolean value is true for the last value.");
    this.setHelpUrl("");
  }
};
/*class MultilineString extends Blockly.Field {
  constructor(text, opt_validator) {
    super(text, opt_validator);
  }
  init() {
    if (this.fieldGroup_) {
      return
    }
    this.fieldGroup_ = Blockly.utils.dom.createSvgElement('g', {}, null)
    this.textElement_ = Blockly.utils.dom.createSvgElement('text', {
      'class': 'customFieldText',
      'x': 0,
      'y': 0,
      'style': 'font-size: 14px;'
    }, this.fieldGroup_)
    this.updateTextNode()
    this.positionField()
    this.sourceBlock_.getSvgRoot().appendChild(this.fieldGroup_)
    this.textElement_.addEventListener('click', () => this.showEditor())
    this.SERIALIZABLE = true
  }
  positionField() {
    const xy = this.getComputedXY()
    this.fieldGroup_.setAttribute('transform', `translate(${xy.x}, ${xy.y})`)
  }
  getComputedXY() {
    return { x: 10, y: 20 }
  }
  updateTextNode() {
    this.textElement_.textContent = this.getText()
  }
  getText() {
    return this.value_
  }
  setText(text) {
    this.value_ = text
    this.updateTextNode()
  }
  showEditor() {
    const newText = window.prompt('Enter new value:', this.getText())
    if (newText !== null) {
      this.setText(newText)
    }
  }
  static fromJson(options) {
    return new MultilineString(options['value'])
  }
}
Blockly.fieldRegistry.register('multiline_string', MultilineString)
Blockly.Blocks['example_block'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new MultilineString('#FF0000'), "FIELD")
    this.setColour(50)
  this.setTooltip('This is a block with a custom field.')
  this.setOutput(true, "Boolean")
  this.setHelpUrl('')
  }
}
Blockly.JavaScript.forBlock['example_block'] = function(block, generator) {
  var dropdown_bool = block.getFieldValue('FIELD')
  return [dropdown_bool, Blockly.JavaScript.ORDER_NONE]
}*/
