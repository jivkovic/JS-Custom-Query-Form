function CustomQueryForm(tableName)
{

	this.Database = [
		{
			tableName: 'prihodi',
			fields: [
				{
					fieldName: 	'field1',
					type:		'integer'
				},
				{
					fieldName: 	'field2',
					type:		'string'
				},
				{
					fieldName: 	'field3',
					type:		'date'
				}
			]
		},
		{
			tableName: 'rashodi',
			fields: [
				{
					fieldName: 	'field1',
					type:		'string'
				}
			]
		},
	];
	
	this.DBoperators = ['AND', 'OR'];
	this.Operators = ['=', '<>', '>', '<'];
	
	this.Structure = [];
	that = this;
	
	this.init = function()
	{
	
		this.element = document.getElementById('CustomQueryForm');
		
		//init table
		this.Database.forEach(function(entry) {
			if (entry.tableName == tableName)
				table = entry;
		});
		
		//toolbar
		this.element.innerHTML = 'Novi redak:';

		//tables
		var newSelect=document.createElement('select');
		for(id in this.Database)
			newSelect.options[newSelect.options.length] = new Option(this.Database[id].tableName, id);
			
		newSelect.setAttribute("onChange", "myForm.changeTable(this.selectedIndex)");
		this.element.appendChild(newSelect);
		
		//fields
		var newSelect=document.createElement('select');
		for(id in table.fields)
			newSelect.options[newSelect.options.length] = new Option(table.fields[id].fieldName, id);
			
		this.element.appendChild(newSelect);
		
		this.element.innerHTML += '<button type="button" onClick="myForm.addRow(document.getElementById(\'CustomQueryForm\').children[1].selectedIndex)">Dodaj</button>';

	}
	
	this.changeTable = function(index)
	{
		//clear
		this.element.children[1].options.length = 0;
		
		table = this.Database[index];
		
		//add new options
		for(id in table.fields)
			this.element.children[1].options[this.element.children[1].options.length] = new Option(table.fields[id].fieldName, id);
			
	}
	
	this.addRow = function(index)
	{
		
		//row container
		var newDiv=document.createElement('div');
		newDiv.setAttribute("name", "d[]");
			
		//DB operators
		var newSelect=document.createElement('select');
		for(id in this.DBoperators)
			newSelect.options[newSelect.options.length] = new Option(this.DBoperators[id], id);
		newSelect.style.width="70px";
		if (this.Structure.length == 0)
			newSelect.setAttribute("disabled", "disabled");
			
		newSelect.setAttribute("name", "DBoperators[]");
		newDiv.appendChild(newSelect);
		
		//field
		var newLabel = document.createElement("span");
		newLabel.innerHTML = " " + table.tableName + "." + table.fields[index].fieldName + " ";
		
		newDiv.appendChild(newLabel);
		
		//hidden field
		var element = document.createElement('input');
		element.type = 'hidden';
		element.value = table.tableName + "." + table.fields[index].fieldName;
		element.name = 'Fields[]';
		
		newDiv.appendChild(element);
	
		//operators
		var newSelect=document.createElement('select');
		for(id in this.Operators)
			newSelect.options[newSelect.options.length] = new Option(this.Operators[id], id);
			
		newSelect.setAttribute("name", "Operators[]");
		newDiv.appendChild(newSelect);
 
		//input
		var element = document.createElement("input");
		element.setAttribute("type", "input");
		switch (table.fields[index].type)
		{
			case 'string':
				element.setAttribute("value", "'string'");
				break;
			case 'integer':
				element.setAttribute("value", "number");
				break;
			case 'date':
				element.setAttribute("value", "mm:dd:yyyy");
				break;
		}
		
		element.setAttribute("name", "Inputs[]");
		newDiv.appendChild(element);
		
		//remove button
		var newButton=document.createElement('button');
		var text=document.createTextNode("x");
		newButton.appendChild(text);
		newButton.setAttribute("onClick", "myForm.delRow(this.parentNode)");
		
		newDiv.appendChild(newButton);
		
		this.element.appendChild(newDiv);
		
		this.Structure.push(index);
	}
	
	this.delRow = function(element)
	{
		this.element.removeChild(element);
		this.Structure.pop();		
		
		if (this.Structure.length >0 )
			this.element.children[2].children[0].setAttribute("disabled", "disabled");
	}
	
	return this.init();
	
}

var myForm = new CustomQueryForm('prihodi');