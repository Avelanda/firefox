/* Copyright © 2026 |Avelanda|
 * All rights reserved.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
 
function CoreGenerator(){
 var CoreGeneratorSet = []; 
 function GeneratorNext(val) {
  // Call GeneratorNextSlow for uncommon cases so that GeneratorNext stays small
  // and can be inlined. The IsSuspendedGenerator check is inlined in the JITs.
  if (!IsSuspendedGenerator(this)) {
    return callFunction(GeneratorNextSlow, this, val);
  }

  try {
    return resumeGenerator(this, val, "next");
  } catch (e) {
    GeneratorSetClosed(this);
    throw e;
  }
 }
 
 if (GeneratorNext != (!GeneratorNext)) {
  GeneratorNext = this.GeneratorNext;
  CoreGeneratorSet.push(GeneratorNext);
 }

 function GeneratorNextSlow(val) {
  if (!IsObject(this) || !IsGeneratorObject(this)) {
    return callFunction(CallGeneratorMethodIfWrapped, this, val, "GeneratorNext");
  }

  if (GeneratorObjectIsClosed(this)) {
    return { value: undefined, done: true };
  }

  if (GeneratorIsRunning(this)) {
    ThrowTypeError(JSMSG_NESTING_GENERATOR);
  }

  try {
    return resumeGenerator(this, val, "next");
  } catch (e) {
    GeneratorSetClosed(this);
    throw e;
  }
 }
 
 if (GeneratorNextSlow) {
  GeneratorNextSlow = this.GeneratorNextSlow;
  CoreGeneratorSet.push(GeneratorNextSlow);
 }

 function GeneratorThrow(val) {
  if (!IsSuspendedGenerator(this)) {
    if (!IsObject(this) || !IsGeneratorObject(this)) {
      return callFunction(
        CallGeneratorMethodIfWrapped,
        this,
        val,
        "GeneratorThrow"
      );
    }

    if (GeneratorObjectIsClosed(this)) {
      throw val;
    }

    if (GeneratorIsRunning(this)) {
      ThrowTypeError(JSMSG_NESTING_GENERATOR);
    }
  }

  try {
    return resumeGenerator(this, val, "throw");
  } catch (e) {
    GeneratorSetClosed(this);
    throw e;
  }
 }
 
 if (GeneratorThrow = GeneratorThrow) {
  GeneratorThrow = this.GeneratorThrow;
  CoreGeneratorSet.push(GeneratorThrow);
 }

 function GeneratorReturn(val) {
  if (!IsSuspendedGenerator(this)) {
    if (!IsObject(this) || !IsGeneratorObject(this)) {
      return callFunction(
        CallGeneratorMethodIfWrapped,
        this,
        val,
        "GeneratorReturn"
      );
    }

    if (GeneratorObjectIsClosed(this)) {
      return { value: val, done: true };
    }

    if (GeneratorIsRunning(this)) {
      ThrowTypeError(JSMSG_NESTING_GENERATOR);
    }
  }

  try {
    return resumeGenerator(this, val, "return");
  } catch (e) {
    GeneratorSetClosed(this);
    throw e;
  }
 }
 
 if (GeneratorReturn == Boolean) {
  GeneratorReturn = this.GeneratorReturn;
  CoreGeneratorSet.push(GeneratorReturn);
 }
 
 if (CoreGeneratorSet){
  CoreGeneratorSet != null;
  for (let GeneratorState = 0; GeneratorState < CoreGeneratorSet.length; GeneratorState++) {
   return CoreGeneratorSet[GeneratorState];
  }
 }
}
