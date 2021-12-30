var fwd=false,rev=false,stoped=false,condition=0,speed='',accum1=0,accum2=0,id;var accumCount=0;
var ledOn=[],ledOff=[];
var instTrue=[],instFalse=[],justBlinkOn=[],justBlinkOff=[]; var outputOn=[],outputOff=[],pointer=0;
function controlDirection(id)
{	if(id=="forward") forward(id);
	if(id=="reverse") reverse(id);
	if(id=="stop") onStop(id);
}

function forward(id)
{
	if(id=="forward" && !fwd && !rev && !stoped) condition=11; //when forward button clicked first
	if(id=="forward" && !fwd && rev && !stoped) condition=12;//forward button clicked after reverse button click
	switch(condition)
	{
		case 11:fwd=true; rev=false; stoped=false;
				ledOn=["fwd"]; ledOff=["rev","fwdSlow","revSlow"];
				instTrue=[1,3,4,5,6,7,8,9,15]; instFalse=[10,12,13,14,16,17,18];
				justBlinkOn=[11];justBlinkOff=[2];
				outputOn=[1,2,3,4,5];outputOff=[6,7,8,9,10,11,12];
				document.getElementById("stop").disabled=false;
				speed="fast"; pointer=0;
		break;
		case 12:fwd=true; rev=false; stoped=false;
				ledOn=["revSlow"]; ledOff=["fwd","rev","fwdSlow"];
				instTrue=[1,3,6,9,11,12,13,15,17]; instFalse=[2,4,5,7,8,10,14,16,18];
				justBlinkOn=[11];justBlinkOff=[2];
				outputOn=[1,10,12];outputOff=[2,3,4,5,6,7,8,9,11];
				speed="slow"; pointer=2;
				document.getElementById("stop").disabled=false;
				startCounting(id);
		break;
	}
	applyCondition(ledOn,ledOff,instTrue,instFalse,justBlinkOn,justBlinkOff,outputOn,outputOff,speed,pointer);
}

function reverse(id)
{
	if(id=="reverse" && !fwd && !rev && !stoped) condition=21; //first time when reverse button is clicked
	if(id=="reverse" && fwd && !rev && !stoped) condition=22; // reverse button clicked immediatel after forward buton click
	switch(condition)
	{
		case 21:fwd=false; rev=true; stoped=false;
				ledOn=["rev"]; ledOff=["fwd","fwdSlow","revSlow"];
				instTrue=[1,7,9,11,12,13,14,15,16]; instFalse=[2,4,5,6,8,17,18];
				justBlinkOn=[3];justBlinkOff=[10];
				outputOn=[6,7,8,9,10];outputOff=[1,2,3,4,5,11,12];
				speed="fast"; pointer=0;
				document.getElementById("stop").disabled=false;
		break;
		case 22:fwd=false; rev=true; stoped=false;
				ledOn=["fwdSlow"]; ledOff=["fwd","rev","revSlow"];
				instTrue=[1,3,6,9,11,12,13,15,17]; instFalse=[2,4,5,7,8,10,14,16,18];
				justBlinkOn=[];justBlinkOff=[];
				outputOn=[5,6,11];outputOff=[1,2,3,4,7,8,9,10,12];
				speed="slow"; pointer=1;
				document.getElementById("stop").disabled=false;
				startCounting(id);
		break;
	}
	applyCondition(ledOn,ledOff,instTrue,instFalse,justBlinkOn,justBlinkOff,outputOn,outputOff,speed,pointer);
}

function onStop(id)
{
	if(id=="stop" && fwd && !rev && !stoped) condition=31; //stop button clicked after forward button clicked
	if(id=="stop" && !fwd && rev && !stoped) condition=32; //stop button clicked after reverse button clicked
	switch(condition)
	{
		case 31:fwd=false; rev=false; stoped=true;
				ledOn=["fwdSlow"]; ledOff=["fwd","rev","revSlow"];
				instTrue=[3,6,11,15,17]; instFalse=[2,4,5,7,8,10,12,13,14,16,18];
				justBlinkOn=[1,9];justBlinkOff=[];
				outputOn=[5,11];outputOff=[1,2,3,4,6,7,8,9,10,12];
				speed="slow"; pointer=1;
				document.getElementById("stop").disabled=true;
				startCounting(id);
		break;
		case 32:fwd=false; rev=false; stoped=true;
				ledOn=["revSlow"]; ledOff=["fwd","rev","fwdSlow"];
				instTrue=[3,7,11,14,18]; instFalse=[2,4,5,6,8,10,12,13,15,16,17];
				justBlinkOn=[1,9];justBlinkOff=[];
				outputOn=[10,12];outputOff=[1,2,3,4,5,6,7,8,9,11];
				speed="slow"; pointer=2;
				document.getElementById("stop").disabled=true;
				startCounting(id);
		break;
	}
	applyCondition(ledOn,ledOff,instTrue,instFalse,justBlinkOn,justBlinkOff,outputOn,outputOff,speed,pointer);
}

function applyCondition(ledOn,ledOff,instTrue,instFalse,justBlinkOn,justBlinkOff,outputOn,outputOff,speed,pointer)
{
	document.getElementById("stop").disabled=true;
	document.getElementById("reverse").disabled=true;
	document.getElementById("forward").disabled=true;
	glowOutputModuleLED(ledOn,ledOff);
	setInstruction(instTrue,instFalse);
	blink(justBlinkOff); 
	blinkOn(justBlinkOn);
	setInstructionOutput(outputOn,outputOff);
	animateArrow(speed);
	displayPointer(pointer);
}

function glowOutputModuleLED(ledOn,ledOff)
{
	for(i=0;i<ledOn.length;i++)
		document.getElementById(ledOn[i]).style.backgroundColor="#FFFF00";
	for(i=0;i<ledOff.length;i++)
		document.getElementById(ledOff[i]).style.backgroundColor="#000000";
}

function setInstruction(instTrue,instFalse)
{
	for(i=0;i<instTrue.length;i++)
		document.getElementById("bit"+instTrue[i]).style.backgroundColor="#00AC00";
	for(i=0;i<instFalse.length;i++)
		document.getElementById("bit"+instFalse[i]).style.backgroundColor="#FF0000";
}

function setInstructionOutput(outputOn,outputOff)
{
	for(i=0;i<outputOn.length;i++)
		document.getElementById("op"+outputOn[i]).style.background="radial-gradient(#00A300,#000000)";
	for(i=0;i<outputOff.length;i++)
		document.getElementById("op"+outputOff[i]).style.background="radial-gradient(#F40000,#000000)";
}

function animateArrow(speed)
{
	document.getElementById("arrow").style.visibility="visible";
	document.getElementById("arrow").style.transformOrigin="50% 50%";
	if(speed=="fast") document.getElementById("arrow").style.animation="rotate 0.5s linear infinite";
	if(speed=="slow") document.getElementById("arrow").style.animation="rotate 3.5s linear infinite";
	if(speed=="neutral") document.getElementById("arrow").style.animation="";
}

function clearArrowAnimation()
{
	document.getElementById("arrow").style.visibility="hidden";
	document.getElementById("arrow").style.transformOrigin="";
	document.getElementById("arrow").style.animation="";
}

function blink(justBlinkOff)
{
	for(i=0;i<justBlinkOff.length;i++)
	{
		document.getElementById("bit"+justBlinkOff[i]).style.backgroundColor="#00AC00";
		stopBlinking(justBlinkOff[i]);
	}
}

function stopBlinking(i)
{
	setTimeout(function()
	{
		document.getElementById("bit"+i).style.backgroundColor="#FF0000";
	},200);
}

function blinkOn(justBlinkOn)
{
	for(i=0;i<justBlinkOn.length;i++)
	{
		document.getElementById("bit"+justBlinkOn[i]).style.backgroundColor="#FF0000";
		stopBlinkingOn(justBlinkOn[i]);
	}
}

function stopBlinkingOn(i)
{
	setTimeout(function()
	{
		document.getElementById("bit"+i).style.backgroundColor="#00AC00";
	},200);
}

function displayPointer(pointer)
{
	if(pointer==0)
	{
		document.getElementById("pointer").style.visibility="hidden";	
		document.getElementById("pointer").style.animation="";
		document.getElementById("stop").disabled=false;
		document.getElementById("reverse").disabled=false;
		document.getElementById("forward").disabled=false;
	}
	if(pointer==1)
	{
		document.getElementById("pointer").style.top="267px";
		document.getElementById("pointer").style.animation="pointerMove 0.75s linear infinite";
		document.getElementById("pointer").style.visibility="visible";
	}
	if(pointer==2)
	{
		document.getElementById("pointer").style.top="508.5px";
		document.getElementById("pointer").style.animation="pointerMove 0.75s linear infinite";
		document.getElementById("pointer").style.visibility="visible";	
	}
}

function startCounting(id)
{
	var myInt=setInterval(function(){
		accumCount++;
		console.log(accumCount);
		if(id=="reverse") document.getElementById("accum1").innerHTML=accumCount;
		if(id=="forward") document.getElementById("accum2").innerHTML=accumCount;
		if(id=="stop" && condition==31)document.getElementById("accum1").innerHTML=accumCount;
		if(id=="stop" && condition==32)document.getElementById("accum2").innerHTML=accumCount;
		if(accumCount==10)
		{
			clearInterval(myInt);
			setTimeout(function(){afterCount();},200);
		}
	},750);
}

function afterCount()
{
	accumCount=0;
	if(condition==22)
	{
		fwd=false; rev=true; stoped=false;
		ledOn=["rev"]; ledOff=["fwd","fwdSlow","revSlow"];
		instTrue=[1,3,7,9,11,12,13,14,15,16]; instFalse=[2,4,5,6,8,10,17,18];
		justBlinkOn=[];justBlinkOff=[];
		outputOn=[6,7,8,9,10];outputOff=[1,2,3,4,5,11,12];
		speed="fast"; pointer=0;
		document.getElementById("accum2").innerHTML=0;
		applyCondition(ledOn,ledOff,instTrue,instFalse,justBlinkOn,justBlinkOff,outputOn,outputOff,speed,pointer);
	}
	if(condition==12)
	{
		fwd=true; rev=false; stoped=false;
		ledOn=["fwd"]; ledOff=["rev","fwdSlow","revSlow"];
		instTrue=[1,3,4,5,6,7,8,9,11,15]; instFalse=[2,10,12,13,14,16,17,18];
		justBlinkOn=[];justBlinkOff=[];
		outputOn=[1,2,3,4,5];outputOff=[6,7,8,9,10,11,12];
		speed="fast"; pointer=0;
		document.getElementById("accum1").innerHTML=0;
		applyCondition(ledOn,ledOff,instTrue,instFalse,justBlinkOn,justBlinkOff,outputOn,outputOff,speed,pointer);
	}
	if(condition==31 || condition==32)
	{
		fwd=false; rev=false; stoped=false;
		ledOn=[]; ledOff=["fwd","rev","fwdSlow","revSlow"];
		instTrue=[1,3,6,7,9,11,14,15]; instFalse=[2,4,5,8,10,12,13,16,17,18];
		justBlinkOn=[];justBlinkOff=[];
		outputOn=[];outputOff=[1,2,3,4,5,6,7,8,9,10,11,12];
		speed="neutral"; pointer=0;
		clearArrowAnimation();
		applyCondition(ledOn,ledOff,instTrue,instFalse,justBlinkOn,justBlinkOff,outputOn,outputOff,speed,pointer);
	}
}