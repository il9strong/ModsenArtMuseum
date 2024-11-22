module.exports = {
	transform: {
		'^.+\\.[tj]sx?$': 'babel-jest',
		'^.+\\.tsx?$': 'ts-jest',
		'\\.(jpg|jpeg|png|gif|bmp|svg)$': 'jest-transform-stub',
	},
	extensionsToTreatAsEsm: ['.jsx', '.ts', '.tsx'],
	globals: {
		'ts-jest': {
			useESM: true,
		},
	},
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
		'\\.scss$': 'identity-obj-proxy',
		'\\.svg$': '<rootDir>/src/tests/fileMock.js',
	},
	moduleFileExtensions: ['js', 'mjs', 'cjs', 'jsx', 'ts', 'tsx', 'json', 'node'],
	testEnvironment: 'jest-environment-jsdom',
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
