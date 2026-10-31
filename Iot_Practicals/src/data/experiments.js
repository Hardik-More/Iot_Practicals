const experimentNames = [
  ['2×1 Multiplexer', '2×1 MUX'],
  ['4×1 Multiplexer', '4×1 MUX'],
  ['Transmission Gate Circuit', 'Transmission Gate'],
  ['NAND Gate', 'NAND'],
  ['Negative Latch Circuit', 'Negative Latch'],
  ['NOR Gate', 'NOR'],
  ['Positive Latch Circuit', 'Positive Latch'],
  ['Negative Register Circuit', 'Negative Register'],
  ['Positive Register Circuit', 'Positive Register'],
  ['Ring Oscillator', 'Ring Oscillator'],
  ['XNOR Gate', 'XNOR'],
  ['XOR Gate', 'XOR']
];
export const experiments = experimentNames.map(([title, short], index) => ({
  id: index + 1,
  slug: `vlsi-exp-${String(index + 1).padStart(2, '0')}`,
  short,
  title,
  subtitle: 'LTspice schematic',
  image: `/diagrams/vlsi/exp-${String(index + 1).padStart(2, '0')}.png`,
  diagramCaption: 'LTspice schematic imported from the provided VLSI lab file.',
  imageOnly: true
}));