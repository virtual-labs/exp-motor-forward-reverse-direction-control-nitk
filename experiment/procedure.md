### Procedure

<p style="text-align: justify;">In our experiment, we wish to change the direction of motor rotation by click of a push button, using a PLC. <br>
Let us see the basic diagram of the circuitry:  </p>

<center>
<img src="images/PR/1.gif" height=500 width=450></center></br>

#### Ladder logic design :
<p style="text-align: justify;">Now, let us see how the ladder logic of motor forward and reverse direction control is implemented using a PLC. </p>

<ul type=disc style="text-align: justify;">
<li>Inputs to the PLC are:
<ul style="text-align: justify;">
<li>Stop ( normally open push button ) <br></li>
<li>Forward (normally open push button ) <br></li>
<li>Reverse (normally open push button ) <br></li>
</ul><br>

</li>

<li>Outputs to the PLC are:
<ul style="text-align: justify;">
<li>Motor forward circuit <br></li>
<li>Motor reverse circuit  <br></li>
<li>Forward (LED)  <br></li>
<li>Reverse (LED)  <br></li>
<li>Forward slow (LED)  <br></li>
<li>Reverse slow (LED)  <br></li>
</ul>
</li>
<br>
<strong><u>Note</strong></u> : Motor forward circuit (forwardmtr) and Motor reverse circuit (reversemtr) is a circuit, which is connected to the motor, which changes the supply polarity , which is fed to the motor. In return, changes the direction of motor rotation.

<br>
<br>

<li>Since the inputs and outputs are less, 8-point input module and 8 point output module is sufficient, where CPU resides in slot 0, input module resides in slot 1 and output module in slot 2. </li>
<br>

<li>Let us assign the address for the input and output signals of the PLC: <br><br>
<ul style="text-align: justify;">
<li>Stop (normally open push button ) : I:1/0 <br></li>
<li>Forward (normally open push button) : I:1/1 <br></li>
<li>Reverse (normally open push button) : I:1/2 <br></li>
<li>Temp1(temporary variable) : O:2/0 <br></li>
<li>forwardmtr ( Motor forward circuit ) : O:2/1 <br></li>
<li>Temp2(temporary variable) : O:2/2 <br></li>
<li>Forward (LED) : O:2/3 <br></li>
<li>reversemtr (Motor reverse circuit ) : O:2/4 <br></li>
<li>Reverse (LED) : O:2/5 <br></li>
<li>Forwardslow (LED) : O:2/6 <br></li>
<li>Reverseslow (LED) : O:2/7<br></li>
</ul>
</li><br>

<li>Let us see its ladder logic diagram:<br>

<center>
<img src="images/PR/2.gif" height=600 width=650></center>
</ul>

<p style="text-align: justify;"><strong><u>Note</strong></u> : Here, the motor’s breaking is natural breaking. So when the motor’s direction in changed, it cannot instantly change its direction. When motor’s supply is cut down, it will have a natural breaking, during which its speed reduces and finally comes to rest. Our assumption is that, the motor takes 7 seconds to completely stop. So when the motor is instructed to change direction by the user, PLC cuts off its supply, till it comes to rest and then, it changes its direction, using the direction changing circuits ( forwardmtr, reversemtr ) . In order to be on the safer side, an off-delay timer of 10 seconds ( greater than 7 seconds) is used, to activate the motor direction changing circuits.</p>

<ol type="a" >
<li><br>
<center>
<img src="images/PR/3.gif" height=350 width=550></center>
<p style="text-align: justify;">The above rungs are used for the forward motor direction rotation. </p>
</li><br>

<li><br>
<center>
<img src="images/PR/4.gif" height=200 width=550></center>
<p style="text-align: justify;">The above rung is executed when the motor is instructed to change direction from forward to reverse, or from forward to stop. </p>
</li><br>

<li><br>
<center>
<img src="images/PR/5.gif" height=450 width=550></center>
<p style="text-align: justify;">The above rungs are used for the reverse motor direction rotation. </p>
</li><br>

<li><br>
<center>
<img src="images/PR/6.gif" height=200 width=550></center>
<p style="text-align: justify;">The above rung is executed when the motor is instructed to change direction from reverse to forward, or from reverse to stop. </p>
</li>

</ol>

The following screen shots explain the operation:
<center>
<img src="images/PR/7.gif" height=500 width=700></center>
The above screen shot represents the condition when the motor is running forward.<br>

<center>
<img src="images/PR/8.gif" height=500 width=700></center>
The above screen shot represents the condition when the reverse push button is pressed while the motor was running in forward direction, and the motor starts braking before it starts revolving in reverse direction.<br>


<center>
<img src="images/PR/9.gif" height=500 width=700></center>
The above screen shots represents the condition when the motor is running in reverse direction.
