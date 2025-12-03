import { expect, it } from 'vitest';
import { getFileName } from '../../../../shared/utils/getFileName';

it.each([
    ["C:\\path\\123123uuid.file.txt", "file.txt"],
    ["C:\\another\\path\\with\\lots\\of\\hierarchy\\123123123uuid.supersilly.mpeg", "supersilly.mpeg"],
    ["D:\\this\\path\\is\\boring\\1.testing.extension", "testing.extension"],
    ["\/home\/linux\/path\/uuid.file.bin", "file.bin"],
    ["\/home\/doesnt\/need\/uuids\/justafile.md", "justafile.md"],
])('returns correct file names', (input, expected) => {
    expect(getFileName(input)).toBe(expected);
})

