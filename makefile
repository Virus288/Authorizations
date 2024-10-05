clean:
	rm -rf ./build \
	rm tsconfig.tsbuildinfo \
	rm tsconfig.release.tsbuildinfo

test:
	clear \
	&& npm run test:unit \
	&& npm run test:db \
	&& npm run test:e2e