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

## GitHub Flavored Markdown Features

This section demonstrates the newly enabled GFM (GitHub Flavored Markdown) support.

### Practice Schedule

A simple task list for music practice:

- [x] Practice C major scale
- [x] Learn A minor chord
- [ ] Practice chord transitions
- [ ] Learn fingerpicking pattern
- [ ] Record practice session

### Chord Reference Table

Here's a quick reference table of common guitar chords:

| Chord | Type | Difficulty | Common Use |
|-------|------|------------|------------|
| C Major | Open | Easy | Very common, key of C |
| G Major | Open | Easy | Most popular chord |
| D Major | Open | Medium | Key of D, G |
| A Minor | Open | Easy | Relative minor of C |
| E Minor | Open | Easy | Easiest minor chord |
| F Major | Barre | Hard | Key of C, F |

### Practice Notes

~~Don't forget to practice B♭ major today~~ - Already completed!

Remember to check out these resources:
- https://www.musictheory.net
- https://github.com/sithmel/remark-music-plugins

### Scale Comparison

| Scale Type | Notes (C) | Character | Use Case |
|------------|-----------|-----------|----------|
| Major | C D E F G A B | Happy, bright | Pop, classical |
| Minor | C D E♭ F G A♭ B♭ | Sad, dark | Rock, blues |
| Pentatonic | C D E G A | Versatile | Blues, rock solos |
| Blues | C E♭ F F♯ G B♭ | Bluesy | Blues, jazz |

This markdown file can be processed by both the remark-lilypond and remark-guitar-chart plugins to generate HTML with embedded SVG musical notation and guitar chord diagrams.
