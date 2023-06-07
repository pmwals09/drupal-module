import { useSpring, useSpringRef } from "@react-spring/web";

export function useAnimations() {
  const timings = {};
  timings.text = { duration: 1500, delay: 0 };
  timings.persona = { duration: 1000, delay: 1000 };
  timings.texture = { duration: 1500, delay: 0 };
  const {
    ref: textRef,
    styles: textStyles,
    reset: textReset,
  } = useTextAnimation(timings);
  const {
    ref: personaRef,
    styles: personaStyles,
    reset: personaReset,
  } = usePersonaAnimation(timings);
  const {
    ref: textureRef,
    styles: textureStyles,
    reset: textureReset,
  } = useTextureAnimation(timings);

  function intro() {
    textRef.start();
    personaRef.start();
    textureRef.start();
  }

  function reset() {
    const promises = [textReset(), personaReset(), textureReset()];

    return Promise.all(promises);
  }

  return {
    styles: {
      text: textStyles,
      persona: personaStyles,
      texture: textureStyles,
    },
    intro,
    reset,
  };
}

function useTextAnimation(timings) {
  const ref = useSpringRef();
  const from = {
    opacity: 0,
  };
  const styles = useSpring({
    ref,
    opacity: 1,
    from,
    config: {
      ...timings.text,
    },
  });

  function reset() {
    return new Promise((resolve) => {
      ref.start({ ...from, onRest: () => resolve() });
    });
  }

  return { ref, styles, reset };
}

function usePersonaAnimation(timings) {
  const ref = useSpringRef();
  const from = {
    y: 2000,
    opacity: 0,
  };
  const styles = useSpring({
    ref,
    y: 0,
    opacity: 1,
    from,
    config: {
      ...timings.persona,
    },
  });

  function reset() {
    return new Promise((resolve) => {
      ref.start({ ...from, onRest: () => resolve() });
    });
  }

  return { ref, styles, reset };
}

function useTextureAnimation(timings) {
  const ref = useSpringRef();
  const from = {
    opacity: 0,
  };
  const styles = useSpring({
    ref,
    opacity: 1,
    from,
    config: {
      ...timings.texture,
    },
  });

  function reset() {
    return new Promise((resolve) => {
      ref.start({ ...from, onRest: () => resolve() });
    });
  }
  return { ref, styles, reset };
}
