( function() {
	var el = wp.element.createElement,
	registerBlockType = wp.blocks.registerBlockType,
	PlainText = wp.blocks.PlainText,
	BlockControls = wp.blocks.BlockControls,
	InspectorControls = wp.blocks.InspectorControls,
	TextControl = wp.components.TextControl;

	registerBlockType( 'david-binda/marquee', { // Název bloku - prefix / jméno.

		// Titulek, ikona a kategorie pro zobrazení v nabíce bloků.
		title: 'Marquee',
		icon: 'controls-repeat',
		category: 'layout',

		/*
		 * Všechny atributy, které chceme moci měnit, musí být zaregistrované.
		 */
		attributes: {
			content: { // Vlastnost "content" typu řetězec
				type: 'string',
			},
			direction: { // Vlastnost "direction" typu řetězec
				type: 'string',
			},
			scrollAmount: {
				type: 'number',
				default: 6,
			}
		},

		/**
		 * Funkce, která se zavolá při úpravě bloku
		 */
		edit: function( props ) {

			/**
			 * Callback pro případ, kdy se změní hodnota obsahu.
			 */
			function onChangeContent( newContent ) {
				props.setAttributes( { content: newContent } );
			}

			/**
			 * Callback pro případ, kdy se změní hodnota směru posuvu.
			 * onClick očekává funkci, tudíž musíme vrátit funkci.
			 */
			function onChangeDirection( newDirection ) {
				return function() {
					// Pokud jsme na tlačítko s vybraným směrem klikli opakovaně, nastavení zrušíme na defaultní "left".
					props.setAttributes( { 'direction': props.attributes.direction === newDirection ? 'left' : newDirection } );
				};
			}

			function onChangeLoop( newAmount ) {
				props.setAttributes( { 'scrollAmount': newAmount } );
			}

			/*
			 * Jelikož chceme prvek zobrazit už v editoru, pokud není zrovna upravován,
			 * tak jako na frontendu, pomůžeme si defaultní vlastností isSelected.
			 */
			if ( true !== props.isSelected ) {
				// Zde vracíme prvek prakticky stejně, jako v případě funkce "save".
				return el(
					'marquee', // HTML element
					{
						className: props.className, // Třída generovaná Gutenbergem.
						'direction': props.attributes.direction, // vlastní attribute direction.
						'scrollamount': props.attributes.scrollAmount || 6, // vlastní attribute scrollamount.
					},
					props.attributes.content || props.attributes.placeholder || "Hello world!" // obsah prvku, placeholder, nebo defaultní placeholder.
				);
			} else {
				/*
				 * Pokud s prvkem manipulujeme, chceme zobrazit nějaké ovládací prvky
				 * a také změnit element marquee na textarea, aby uživatel mohl editovat text.
				 */

				// Vrátíme celé pole prvků
				return [
					// Nejprve panel nástrojů obsahující možnost změny směru posuvu.
					el(
						BlockControls, // BlockControls je prvek existující v rámci Gutenbergu.
						{ 'controls': [ { // Jednotlivá tlačítka lze snadno definovat jako pole objektů.
							icon: 'arrow-left', // Ikona tlačítka v panelu nástrojů.
							title: 'Direction Left', // Popisek.
							onClick: onChangeDirection( 'left' ), // Akce vykonávající se při kliknutí.
							isActive: ( 'left' === props.attributes.direction || undefined === props.attributes.direction ) // zda-li je tlačítko aktivní či nikoli.
						}, {
							icon: 'arrow-right',
							title: 'Direction Right',
							onClick: onChangeDirection( 'right' ),
							isActive: ( 'right' === props.attributes.direction )
						}, {
							icon: 'arrow-up',
							title: 'Direction Up',
							onClick: onChangeDirection( 'up' ),
							isActive: ( 'up' === props.attributes.direction )
						}, {
							icon: 'arrow-down',
							title: 'Direction down',
							onClick: onChangeDirection( 'down' ),
							isActive: ( 'down' === props.attributes.direction )
						} ] }
					),
					// Inspektor (zobrazí se v záložce "Blok" v pravém sloupci).
					el(
						InspectorControls,
						{},
						el(
							TextControl,
							{
								label: 'Scroll speed (defaults to 6):',
							 	value: props.attributes.scrollAmount,
								onChange: onChangeLoop,
								type: 'number',
							}
						)
					),
					// Dále samotný prvek v editovatelné podobě.
					el(
						PlainText, // Textarea.
						{
							className: props.className,
							onChange: onChangeContent, // Callback.
							placeholder: props.attributes.placeholder || "Hello world!", // Placeholder.
							value: props.attributes.content, // Obsah textového pole.
							isSelected: props.isSelected,
							style: {'display':'inline-block'}, // Marquee je defaultně inline-block, tak toto chceme zachovat.
						}
					),
				];
			}
		},

		/**
		 * Funkce, která se zavolá při ukládání prvku.
		 * Například přechod mezi visual a code editorem.
		 */
		save: function( props ) {
			/*
			 * Všimněte si, že toto je stejné, jako v případě, kdy
			 * isSelected vrací false (ve funkci edit).
			 */
			return el(
				'marquee',
				{
					className: props.className,
					'direction': props.attributes.direction,
					'scrollamount': props.attributes.scrollAmount || 6,
				},
				props.attributes.content || props.attributes.placeholder || "Hello world!" // obsah prvku, placeholder, nebo defaultní placeholder.
			);
		},
	} );
})();
