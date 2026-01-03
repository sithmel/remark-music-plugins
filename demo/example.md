# Music Notation Demo

This document demonstrates both the LilyPond and guitar-chart integrations in music-md.

## Simple Melody

Here's a basic melody in C major:

```lilypond
\version "2.20.0"

{
  \clef treble
  \time 4/4
  \key c \major

  c'4 d'4 e'4 f'4 |
  g'4 a'4 b'4 c''2
}
```

## Chord Progression

A simple chord progression:

```lilypond
\version "2.20.0"

{
  \clef treble
  \time 4/4
  \key c \major

  <c' e' g'>2 <a c' e'>2 |
  <f a c'>2 <g b d'>2 |
  <c' e' g'>1
}
```

## Bass Line

And here's a corresponding bass line:

```lilypond
\version "2.20.0"

{
  \clef bass
  \time 4/4
  \key c \major

  c2 a,2 |
  f,2 g,2 |
  c1
}
```

## Guitar Chords

Here are some common guitar chord diagrams:

### A Minor Chord

```guitar-chart
  A minor
  ‾‾‾‾‾‾‾‾‾‾‾
  ○ ○       ○
  ╒═╤═╤═╤═╤═╕
  │ │ │ │ ○ │
  ├─┼─┼─┼─┼─┤
  │ │ ○ ● │ │
  ├─┼─┼─┼─┼─┤
  │ │ │ │ │ │
  └─┴─┴─┴─┴─┘
```

### D Major Chord and G 7 Chord

```guitar-chart
  D
  ‾‾‾‾‾‾‾‾‾‾‾
  × ○ ○
  ╒═╤═╤═╤═╤═╕
  │ │ │ │ │ │
  ├─┼─┼─┼─┼─┤
  │ │ │ ○ │ ○
  ├─┼─┼─┼─┼─┤
  │ │ │ │ ● │
  └─┴─┴─┴─┴─┘

  G 7
  ######
  xx
  ------
 5||*|||
  ||||o|
  |||o|o
```

### Complex Chord Example

```guitar-chart
  E dom 7
  #######
  x    x
  ------
  |||3||
  |51|||
  ||||7|

  D
  ‾‾‾‾‾‾‾‾‾‾‾
  × ○ ○
  ╒═╤═╤═╤═╤═╕
  │ │ │ │ │ │
  ├─┼─┼─┼─┼─┤
  │ │ │ ○ │ ○
  ├─┼─┼─┼─┼─┤
  │ │ │ │ ● │
  └─┴─┴─┴─┴─┘

  G 7
  ######
  xx
  ------
 5||*|||
  ||||o|
  |||o|o
```

## Multiple Chords in One Block

You can also display multiple chord diagrams together by using an array:

### Common Chord Progression (C-Am-F-G)

```guitar-chart
  G 7
  ######
  xx
  ------
 5||*|||
  ||||o|
  |||o|o

  E dom 7
  #######
  x    x
  ------
  |||3||
  |51|||
  ||||7|

  Dominant 7
  ##########
  xx
  ======
  ||*|||
  ||||o|
  |||o|o

  E dom 7
  #######
  x    x
  ------
  |||3||
  |51|||
  ||||7|

```

### Power Chord Sequence

```guitar-chart
  G 7
  ‾‾‾‾‾‾‾‾‾‾‾
  × ×
  ┌─┬─┬─┬─┬─┐
 5│ │ ● │ │ │
  ├─┼─┼─┼─┼─┤
  │ │ │ │ ○ │
  ├─┼─┼─┼─┼─┤
  │ │ │ ○ │ ○
  └─┴─┴─┴─┴─┘

  E dom 7
  ‾‾‾‾‾‾‾‾‾‾‾
  ×         ×
  ┌─┬─┬─┬─┬─┐
  │ │ │ 3 │ │
  ├─┼─┼─┼─┼─┤
  │ 5 1 │ │ │
  ├─┼─┼─┼─┼─┤
  │ │ │ │ 7 │
  └─┴─┴─┴─┴─┘

  G 7
  ‾‾‾‾‾‾‾‾‾‾‾
  × ×
  ┌─┬─┬─┬─┬─┐
 5│ │ ● │ │ │
  ├─┼─┼─┼─┼─┤
  │ │ │ │ ○ │
  ├─┼─┼─┼─┼─┤
  │ │ │ ○ │ ○
  └─┴─┴─┴─┴─┘

  E dom 7
  ‾‾‾‾‾‾‾‾‾‾‾
  ×         ×
  ┌─┬─┬─┬─┬─┐
  │ │ │ 3 │ │
  ├─┼─┼─┼─┼─┤
  │ 5 1 │ │ │
  ├─┼─┼─┼─┼─┤
  │ │ │ │ 7 │
  └─┴─┴─┴─┴─┘

  G 7
  ‾‾‾‾‾‾‾‾‾‾‾
  × ×
  ┌─┬─┬─┬─┬─┐
 5│ │ ● │ │ │
  ├─┼─┼─┼─┼─┤
  │ │ │ │ ○ │
  ├─┼─┼─┼─┼─┤
  │ │ │ ○ │ ○
  └─┴─┴─┴─┴─┘

  E dom 7
  ‾‾‾‾‾‾‾‾‾‾‾
  ×         ×
  ┌─┬─┬─┬─┬─┐
  │ │ │ 3 │ │
  ├─┼─┼─┼─┼─┤
  │ 5 1 │ │ │
  ├─┼─┼─┼─┼─┤
  │ │ │ │ 7 │
  └─┴─┴─┴─┴─┘

```
## pentatonic scales
```guitar-chart
  ┌─┬─┬─┬─┬─┐    ┌─┬─┬─┬─┬─┐    ┌─┬─┬─┬─┬─┐
  │ │ # │ │ │    │ │ │ │ # │    │ # │ │ │ │
  ├─┼─┼─┼─┼─┤    ├─┼─┼─┼─┼─┤    ├─┼─┼─┼─┼─┤
  │ │ ○ ○ │ │    ○ ○ ○ ● ○ ○    │ ○ ○ ○ │ │
  ├─┼─┼─┼─┼─┤    ├─┼─┼─┼─┼─┤    ├─┼─┼─┼─┼─┤
  ○ ● │ │ ○ ○    │ # │ │ │ │    ● │ │ # ○ ●
  ├─┼─┼─┼─┼─┤    ├─┼─┼─┼─┼─┤    ├─┼─┼─┼─┼─┤
  │ │ │ │ # │    │ ○ ○ ○ │ │    │ │ │ ○ │ │
  ├─┼─┼─┼─┼─┤    ├─┼─┼─┼─┼─┤    ├─┼─┼─┼─┼─┤
  ○ ○ ○ ● ○ ○    ● │ │ ○ ○ ●    ○ ○ ● │ ○ ○
  ├─┼─┼─┼─┼─┤    └─┴─┴─┴─┴─┘    ├─┼─┼─┼─┼─┤
  │ # │ │ │ │                   # │ │ │ │ #
  └─┴─┴─┴─┴─┘                   └─┴─┴─┴─┴─┘


  ┌─┬─┬─┬─┬─┐    ┌─┬─┬─┬─┬─┐
  │ │ │ # │ │    # │ │ │ │ #
  ├─┼─┼─┼─┼─┤    ├─┼─┼─┼─┼─┤
  │ │ │ ○ │ │    ○ ○ ○ ○ │ ○
  ├─┼─┼─┼─┼─┤    ├─┼─┼─┼─┼─┤
  ○ ○ ● │ ○ ○    │ │ # │ ● │
  ├─┼─┼─┼─┼─┤    ├─┼─┼─┼─┼─┤
  # │ │ │ │ #    │ │ ○ ○ │ │
  ├─┼─┼─┼─┼─┤    ├─┼─┼─┼─┼─┤
  ○ ○ ○ ○ │ ○    ○ ● │ │ ○ ○
  ├─┼─┼─┼─┼─┤    ├─┼─┼─┼─┼─┤
  │ │ # │ ● │    │ │ │ │ # │
  └─┴─┴─┴─┴─┘    └─┴─┴─┴─┴─┘
```

This markdown file can be processed by both the remark-lilypond and remark-guitar-chart plugins to generate HTML with embedded SVG musical notation and guitar chord diagrams.
