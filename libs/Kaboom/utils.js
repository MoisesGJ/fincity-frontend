import { dialogueData } from '@/libs/Kaboom/constants';

export function displayDialogue(text, onDisplayEnd, refs) {
  const { textboxContainerRef, dialogueRef, closeBtnRef } = refs;

  const dialogueUI = textboxContainerRef.current;
  const dialogue = dialogueRef.current;
  const closeBtn = closeBtnRef.current;

  dialogueUI.style.display = 'block';
  let index = 0;
  let currentText = '';

  const intervalRef = setInterval(() => {
    if (index < text.length) {
      currentText += text[index];
      dialogue.innerHTML = currentText;
      index++;
    } else {
      clearInterval(intervalRef);
    }
  }, 50);

  const onCloseBtnClick = () => {
    onDisplayEnd();
    dialogueUI.style.display = 'none';
    dialogue.innerHTML = '';
    clearInterval(intervalRef);
    closeBtn.removeEventListener('click', onCloseBtnClick);
  };

  closeBtn.addEventListener('click', onCloseBtnClick);
  document.addEventListener('keypress', (key) => {
    if (key.code === 'Enter') {
      closeBtn.click();
    }
  });

  return () => {
    closeBtn.removeEventListener('click', onCloseBtnClick);
    document.removeEventListener('keypress', (key) => {
      if (key.code === 'Enter') {
        closeBtn.click();
      }
    });
  };
}
export function setCamScale(k) {
  const resizeFactor = k.width() / k.height();
  if (resizeFactor < 1) {
    k.camScale(k.vec2(1));
  } else {
    k.camScale(k.vec2(1.5));
  }
}
