import { describe, expect, it } from "vitest";
import { MessageEncodingService } from "./MessageEncodingService";

describe('MessageEncodingService', () => {
  it('Should encrypt and decrypt message successfuly', () => {
    console.log('length: ' + ' ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyZ0123456789.,/:'.length)
    const encoded = MessageEncodingService.encode('Test')
    const decoded = MessageEncodingService.decode(encoded)

    expect(decoded).to.equal('Test')
  })
})