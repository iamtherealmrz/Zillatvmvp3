/* only the positions differ because knob is wider */
const lowPos  = 95;   // px
const highPos = 565;  // px (578 track - 44 knob ≈ right edge)

function updateKnobPos(){
  const x = (rancid === 'low') ? lowPos : highPos;
  knobArt.style.left  = x + 'px';
  knobHit.style.left  = x + 'px';
}