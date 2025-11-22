
/**
 * @author mrdoob / http://mrdoob.com/
 */

const CSS3DObject = function ( element ) {

	window.THREE.Object3D.call( this );

	this.element = element;
	this.element.style.position = 'absolute';
	this.element.style.pointerEvents = 'auto';

	this.addEventListener( 'removed', function () {

		this.traverse( function ( object ) {

			if ( object.element instanceof Element && object.element.parentNode !== null ) {

				object.element.parentNode.removeChild( object.element );

			}

		} );

	} );

};

CSS3DObject.prototype = Object.create( window.THREE.Object3D.prototype );
CSS3DObject.prototype.constructor = CSS3DObject;

const CSS3DSprite = function ( element ) {

	CSS3DObject.call( this, element );

};

CSS3DSprite.prototype = Object.create( CSS3DObject.prototype );
CSS3DSprite.prototype.constructor = CSS3DSprite;

//

const CSS3DRenderer = function () {

	const _this = this;

	let _width, _height;
	let _widthHalf, _heightHalf;

	const matrix = new window.THREE.Matrix4();

	const cache = {
		camera: { fov: 0, style: '' },
		objects: new WeakMap()
	};

	const domElement = document.createElement( 'div' );
	domElement.style.overflow = 'hidden';

	this.domElement = domElement;

	const cameraElement = document.createElement( 'div' );

	cameraElement.style.WebkitTransformStyle = 'preserve-3d';
	cameraElement.style.transformStyle = 'preserve-3d';
	cameraElement.style.pointerEvents = 'none';

	domElement.appendChild( cameraElement );

	this.getSize = function () {

		return {
			width: _width,
			height: _height
		};

	};

	this.setSize = function ( width, height ) {

		_width = width;
		_height = height;
		_widthHalf = _width / 2;
		_heightHalf = _height / 2;

		domElement.style.width = width + 'px';
		domElement.style.height = height + 'px';

		cameraElement.style.width = width + 'px';
		cameraElement.style.height = height + 'px';

	};

	function epsilon( value ) {

		return Math.abs( value ) < 1e-10 ? 0 : value;

	}

	function getCameraCSSMatrix( matrix ) {

		const elements = matrix.elements;

		return 'matrix3d(' +
			epsilon( elements[ 0 ] ) + ',' +
			epsilon( - elements[ 1 ] ) + ',' +
			epsilon( elements[ 2 ] ) + ',' +
			epsilon( elements[ 3 ] ) + ',' +
			epsilon( elements[ 4 ] ) + ',' +
			epsilon( - elements[ 5 ] ) + ',' +
			epsilon( elements[ 6 ] ) + ',' +
			epsilon( elements[ 7 ] ) + ',' +
			epsilon( elements[ 8 ] ) + ',' +
			epsilon( - elements[ 9 ] ) + ',' +
			epsilon( elements[ 10 ] ) + ',' +
			epsilon( elements[ 11 ] ) + ',' +
			epsilon( elements[ 12 ] ) + ',' +
			epsilon( - elements[ 13 ] ) + ',' +
			epsilon( elements[ 14 ] ) + ',' +
			epsilon( elements[ 15 ] ) +
		')';

	}

	function getObjectCSSMatrix( matrix ) {

		const elements = matrix.elements;
		const matrix3d = 'matrix3d(' +
			epsilon( elements[ 0 ] ) + ',' +
			epsilon( elements[ 1 ] ) + ',' +
			epsilon( elements[ 2 ] ) + ',' +
			epsilon( elements[ 3 ] ) + ',' +
			epsilon( - elements[ 4 ] ) + ',' +
			epsilon( - elements[ 5 ] ) + ',' +
			epsilon( - elements[ 6 ] ) + ',' +
			epsilon( - elements[ 7 ] ) + ',' +
			epsilon( elements[ 8 ] ) + ',' +
			epsilon( elements[ 9 ] ) + ',' +
			epsilon( elements[ 10 ] ) + ',' +
			epsilon( elements[ 11 ] ) + ',' +
			epsilon( elements[ 12 ] ) + ',' +
			epsilon( elements[ 13 ] ) + ',' +
			epsilon( elements[ 14 ] ) + ',' +
			epsilon( elements[ 15 ] ) +
		')';

		return 'translate(-50%,-50%)' + matrix3d;

	}

	function renderObject( object, scene, camera, cameraCSSMatrix ) {

		if ( object instanceof CSS3DObject ) {

			let style;

			if ( object instanceof CSS3DSprite ) {

				// http://swiftcoder.wordpress.com/2008/11/25/constructing-a-billboard-matrix/

				matrix.copy( camera.matrixWorldInverse );
				matrix.transpose();
				matrix.copyPosition( object.matrixWorld );
				matrix.scale( object.scale );

				matrix.elements[ 3 ] = 0;
				matrix.elements[ 7 ] = 0;
				matrix.elements[ 11 ] = 0;
				matrix.elements[ 15 ] = 1;

				style = getObjectCSSMatrix( matrix );

			} else {

				style = getObjectCSSMatrix( object.matrixWorld );

			}

			const element = object.element;
			const cachedObject = cache.objects.get( object );

			if ( cachedObject === undefined || cachedObject.style !== style ) {

				element.style.WebkitTransform = style;
				element.style.transform = style;

				const objectData = { style: style };
				cache.objects.set( object, objectData );

			}

			element.style.display = object.visible ? '' : 'none';

			if ( element.parentNode !== cameraElement ) {

				cameraElement.appendChild( element );

			}

		}

		for ( let i = 0, l = object.children.length; i < l; i ++ ) {

			renderObject( object.children[ i ], scene, camera, cameraCSSMatrix );

		}

	}

	this.render = function ( scene, camera ) {

		const fov = camera.projectionMatrix.elements[ 5 ] * _heightHalf;

		if ( cache.camera.fov !== fov ) {

			domElement.style.WebkitPerspective = fov + 'px';
			domElement.style.perspective = fov + 'px';

			cache.camera.fov = fov;

		}

		if ( scene.autoUpdate === true ) scene.updateMatrixWorld();
		if ( camera.parent === null ) camera.updateMatrixWorld();

		let cameraCSSMatrix = 'translateZ(' + fov + 'px)' + getCameraCSSMatrix( camera.matrixWorldInverse );

		const style = cameraCSSMatrix + 'translate(' + _widthHalf + 'px,' + _heightHalf + 'px)';

		if ( cache.camera.style !== style ) {

			cameraElement.style.WebkitTransform = style;
			cameraElement.style.transform = style;

			cache.camera.style = style;

		}

		renderObject( scene, scene, camera, cameraCSSMatrix );

	};

};

window.CSS3DObject = CSS3DObject;
window.CSS3DRenderer = CSS3DRenderer;
